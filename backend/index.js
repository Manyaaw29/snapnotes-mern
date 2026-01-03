import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Database connection error:', err);
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

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
