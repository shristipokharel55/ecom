
import express from 'express';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';   
dotenv.config(); 

const app =  express();



connectDb()
app.use(express.json())
app.use(express.urlencoded({encoded:true}));
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).json({
        message : " get from app.js"
    })
})


app.use('/api/user',userRoutes )
app.use("/api/product", productRoutes)
app.use("/api/auth", authRoute)


const port = process.env.PORT
app.listen(port,()=>{
    console.log("port started at:",port)
})









