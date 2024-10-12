import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itineraryRoutes from './routes/itineraryRoutes';
import authRoutes from './routes/authRoutes'; 
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app: Application = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/api/itineraries', itineraryRoutes);
app.use('/api/auth', authRoutes); 


app.get('/', (req: Request, res: Response) => {
  res.send('TripIt Clone API is running...');
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tripit-clone';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
