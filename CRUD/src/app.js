import express from 'express'
import cors from 'cors'


const app = express()

// basic cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json({limit: "16kb"}))

// import the routes
import authRouter from './routes/auth.route.js'

app.use("/api/auth", authRouter)


export default app