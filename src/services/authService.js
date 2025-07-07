import bcrypt from 'bcrypt'
import User from '../models/User.js'

const register = async (data)=>{
    const hashedPassword = bcrypt.hashSync(data.password,10)

    const email = data.email
    const userExist = await User.find({email})

    if(userExist.length>0){
        new Error('user already exist')
    }

    return await User.create({
        email : email,
        password : hashedPassword,
        userName : data.userName,
        phone : data.phone
    })

    console.log(userExist)

    console.log(hashedPassword)
}

export default {register}