import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import dispatchStatic from '@fastify/static'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import util from 'node:util'
import { pipeline } from 'stream'
import rateLimit from '@fastify/rate-limit'

const pump = util.promisify(pipeline)
const app = Fastify({ logger: true })

const UPLOAD_DIR = path.resolve('./src/uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })



app.register(rateLimit, {
  max: 100, 
  timeWindow: '1 minute'
})

app.register(dispatchStatic, {
  root: UPLOAD_DIR,
  prefix: '/cdn/uploads/',
  decorateReply: false
})

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  }
})

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

app.post('/cdn/upload', async (req, reply) => {
  const parts = req.parts()
  const uploadedFiles: string[] = []

  for await (const part of parts) {
    if (part.type !== 'file') continue
    if (!allowedMimeTypes.includes(part.mimetype)) {
      return reply.status(400).send({ message: `Unsupported file type: ${part.mimetype}` })
    }

    const ext = path.extname(part.filename)
    const filename = `${crypto.randomUUID()}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    await pump(part.file, fs.createWriteStream(filepath))
    uploadedFiles.push(`/cdn/uploads/${filename}`)
  }

  return { message: 'Files uploaded', files: uploadedFiles }
})

app.listen({ port: 4000, host: '127.0.0.1' })
