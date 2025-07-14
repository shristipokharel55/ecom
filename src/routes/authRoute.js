import express from 'express';
import { forgotPassword, login, register, verifyOtp } from '../controllers/authController.js';
import User from '../models/User.js';

import bcrypt from 'bcrypt';

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/forgotPassword', forgotPassword)

router.post("/verify-otp", verifyOtp)

router.post("/reset-password", async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){ throw new Error("Email and password required")}

        const doUserExist = await User.findOne({email})

        if(!doUserExist){
            throw new Error("User not registered")
        }

        if(!doUserExist.canChangePassword){
            throw new Error("Plaease verify otp first!")
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const data = await User.findOneAndUpdate({email}, {password: hashedPassword, canChangePassword : false}, {new:true})

        res.status(200).json({
            message: "password changed successfully",
            data
        })
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

export default router;