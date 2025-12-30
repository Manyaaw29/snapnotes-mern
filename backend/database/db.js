import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database connected successfully !!");
    }
    catch(error){
        console.log("Error connecting to the database");
        process.exit(1);
    }
}

export default connectDB;