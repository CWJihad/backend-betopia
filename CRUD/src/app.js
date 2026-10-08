import express from 'express'

const app = express()

app.use(express.json())

// import the routes
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'

app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)


export default app