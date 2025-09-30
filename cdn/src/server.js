import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import dispatchStatic from '@fastify/static';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pipeline } from 'stream';
import util from 'node:util';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';

const pump = util.promisify(pipeline);
const app = Fastify({ logger: true });

const UPLOAD_DIR = path.resolve('./src/uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// === CORS ===
// Разрешить все источники (для разработки)
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Или разрешить только фронт http://localhost:3000
// app.register(cors, {
//   origin: ['http://localhost:3000'],
//   credentials: true, // если нужны cookies
// });

app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

app.register(dispatchStatic, {
  root: UPLOAD_DIR,
  prefix: '/cdn/uploads/',
  decorateReply: false,
});

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

app.post('/cdn/upload', async (req, reply) => {
  try {
    const parts = req.parts();
    const uploadedFiles = [];

    for await (const part of parts) {
      if (part.type !== 'file') continue;
      if (!allowedMimeTypes.includes(part.mimetype)) {
        return reply.status(400).send({ message: `Unsupported file type: ${part.mimetype}` });
      }

      const ext = path.extname(part.filename);
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(UPLOAD_DIR, filename);

      await pump(part.file, fs.createWriteStream(filepath));
      uploadedFiles.push(`/cdn/uploads/${filename}`);
    }
    if(uploadedFiles.length === 1) {
      return { message: 'File uploaded', file: uploadedFiles[0] };
    }

    return { message: 'Files uploaded', files: uploadedFiles };
  } catch (err) {
    return reply.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

app.listen({ port: 4000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
