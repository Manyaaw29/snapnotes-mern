import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Database connection error:', err);
});

const app = express();

// converting input to json 
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));

//using routes here
app.use('/api/auth', authRouter);

//error handling 
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message= err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
