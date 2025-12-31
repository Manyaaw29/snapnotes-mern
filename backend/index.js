import express from 'express';
import cors from cors;
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