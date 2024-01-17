import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

//Connect To Mongo DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Connected to Mongo DB`);
}).catch((error)=>{
    console.log(`Error: ${error}`);
})

//Create Express App
const app = express();

app.use(express.json());

//Listen to port 3000
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}!`);
});

//Route to routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

