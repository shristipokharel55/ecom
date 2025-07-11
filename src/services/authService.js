import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { hashPassword } from '../utils/utility.js'
import { generateOtp } from '../utils/generateOtp.js'
import { sendMail } from '../utils/sendMail.js'


const register = async (data)=>{
    const hashedPassword = hashPassword(data.password)

    const email = data.email
    const userExist = await User.find({email})
    console.log(userExist)

    if(userExist.length>0){
        new Error('user already exist')
    }

    return await User.create({
        email : email,
        password : hashedPassword,
        userName : data.userName,
        phone : data.phone
    })

}

const login = async(data)=>{
    const doEmailExist = await User.find({email:data.email})

    if (!doEmailExist.length>0){
        console.log("email dont exist")
        throw new Error("Invalid Email")
    }

    const dbPassword = doEmailExist[0].password
    const isPasswordMatched = bcrypt.compareSync(data.password,dbPassword)

    if (isPasswordMatched){
        return doEmailExist[0];
    }
    else{
        throw new Error("Password didn't match")
    }

}

const forgotPassword = async (data)=>{
    const userRegistered = await User.findOne({email:data.email})

    if(!userRegistered){throw new Error("User not registered")}


    const otp = generateOtp()

    sendMail(data.email, otp)

    return
}

export default {register, login, forgotPassword}