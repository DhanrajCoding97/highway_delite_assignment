//server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/database';
import experienceRoutes from './routes/experiences';
import bookingsRoutes from './routes/bookings';
import promoRoutes from './routes/promo';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
//connect to database
connectDb();

//Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

//404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
