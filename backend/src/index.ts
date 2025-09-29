import express from 'express'
import helmet from 'helmet'
import 'dotenv/config'
import ds from './data-source'
import productRouter from './routes/productC.routes'


// import { User } from './database/entity'
// import userController from './controllers/user.controller'
const app = express()
const PORT = process.env.PORT || 8200

app.use(express.json())
app.use(helmet())

app.use('/', productRouter)
// app.use('/users', userRoutes)
// app.use('/cart', cartRoutes)
// app.use('/novaposhta', novaposhtaRoutes)
// app.use('/auth', authRouter)

/* Error handling for non-existing routes */
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

console.log('Initializing server...')
/* Initialize typeorm DataSource and start express server */
ds.initialize()
  .then(async() => {
    console.log("start");
    
    // await loadData()
    // userController.createUserInRuntime({ email: '02@net', password: '123' })
    // const novaController = new NovaPoshtaController()
    // NovaposhtaController.updateNovaPoshtaData()

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log(`${JSON.stringify(err)}`)
    console.error(err)
  })
