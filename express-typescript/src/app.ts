import dotenv from 'dotenv'; // eslint-disable-line
dotenv.config(); // eslint-disable-line

import cors from 'cors';
import express, { type Request, type Response } from 'express';
import userRoutes from './routes/user';
import eventRoutes from './routes/event';
import categoryRoutes from './routes/category';
import venueRoutes from './routes/venue';
import ticketRoutes from './routes/ticket';
import participantRoutes from './routes/participant';
import seatRoutes from './routes/seat';
import purchaseRoutes from './routes/purchase'

const app = express();
const PORT = process.env.PORT || 3345;

// GLOBAL MIDDLEWARES:

const corsOptions = {
  origin: 'http://localhost:5173',
  exposedHeaders: 'x-auth-token',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(venueRoutes);
app.use(eventRoutes);
app.use(ticketRoutes);
app.use(participantRoutes);
app.use(seatRoutes);
app.use('/purchases', purchaseRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('User logged out and redirected to home.');
});

app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
});
