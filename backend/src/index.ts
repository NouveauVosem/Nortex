import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'
import ds from './data-source'
import productRouter from './routes/productC.routes'
import rateLimit from 'express-rate-limit'


// import { User } from './database/entity'
// import userController from './controllers/user.controller'
const app = express()
const PORT = process.env.PORT || 8200

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false
})

app.use(express.json())
app.use(helmet())

app.use('/products', apiLimiter)
app.use('/products', productRouter) 

/* Error handling for non-existing routes */
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

console.log('Initializing server...')
/* Initialize typeorm DataSource and start express server */
ds.initialize()
  .then(async() => {
    console.log("start");


    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(`${JSON.stringify(err)}`)
    console.error(err)
  })
