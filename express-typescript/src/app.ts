import dotenv from 'dotenv'
dotenv.config() // eslint-disable-line
import cors from 'cors'
import express, { type Request, type Response, NextFunction } from 'express'
import userRoutes from './routes/user'
import eventRoutes from './routes/event'
import categoryRoutes from './routes/category'
import venueRoutes from './routes/venue'

const app = express()
const PORT = process.env.PORT || 3345

// GLOBAL MIDDLEWARES:

const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(userRoutes)
app.use(categoryRoutes)
app.use(venueRoutes)
app.use(eventRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('User logged out and redirected to home.')
})

app.listen(PORT, () => { console.log(`Connected to port: ${PORT}`) })
