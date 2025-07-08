import bcrypt from 'bcrypt'
import User from '../models/User.js'

const register = async (data)=>{
    const hashedPassword = bcrypt.hashSync(data.password,10)

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

export default {register, login}