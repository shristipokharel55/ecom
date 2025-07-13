import express from 'express';
import { login, register } from '../controllers/authController.js';
import Otp from '../models/Otp.js';
import { generateOtp } from '../utils/generateOtp.js';
import { sendMail } from '../utils/sendMail.js';

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/forgotPassword', async(req, res)=>{
    try {
        const{email}=req.body;
        console.log("email", email);

        if(!email){
            throw new Error("Email is required")
        }
        const otp = generateOtp();

        const newOtp = await Otp.create({
            email:email,
            otp:otp
        })
        sendMail(email, otp)
        res.send(newOtp)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

router.post("/verify-otp", async(req, res)=>{
    try {
        const{email, otp}=req.body

        const doEmailExist = await Otp.findOne({email})

        console.log(doEmailExist)

        if(!doEmailExist){
            throw new Error("Email doesn't exist!")

        }

        await Otp.deleteOne({email})

        if(doEmailExist.otp !==otp){throw new Error("Invallid Otp")}
        res.status(200).json({
            message:"Otpp validated",
            data:doEmailExist
        })

    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})


export default router;