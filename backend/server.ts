//server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/database';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//connect to database
connectDb();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});