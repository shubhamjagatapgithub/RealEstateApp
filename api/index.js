import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Connected to Mongo DB`);
}).catch((error)=>{
    console.log(`Error: ${error}`);
})

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`);
})