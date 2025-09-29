import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import dispatchStatic from '@fastify/static'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import util from 'node:util'
import { pipeline } from 'stream'

const pump = util.promisify(pipeline)
const app = Fastify({ logger: true })

// Папка для загруженных файлов
const UPLOAD_DIR = path.resolve('./src/uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// Раздача статики через /cdn
app.register(dispatchStatic, {
  root: UPLOAD_DIR,
  prefix: '/cdn/uploads/',
  decorateReply: false
})

// Multipart для загрузки файлов
app.register(multipart)

// Разрешённые типы
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Загрузка файлов
app.post('/upload', async (req, reply) => {
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

app.listen({ port: 4000 }, (err, address) => {
  if (err) throw err
  console.log(`CDN server listening at ${address}`)
})
