import { configDotenv } from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app =  express();

configDotenv();

connectDb()

app.get('/',(req,res)=>{
    res.status(200).json({
        message : " get from app.js"
    })
})


app.use('/api',userRoutes )



const port = process.env.PORT
app.listen(port,()=>{
    console.log("port started at 4000: ",port)
})









