import { createToken } from "../helpers/tokens.js"
import authService from "../services/authService.js"
import jwt from 'jsonwebtoken'


const register = async(req, res)=>{
    
    try{
        const {email, phone, password, confirmPassword, userName} = req.body
    
        if(!password || !email || !phone || !confirmPassword || !userName){
            return res.status(400).json({message:"user credentials missing"})
        }
    
        if (password!==confirmPassword){return res.status(400).json({message:"password donot match"})}
    
        const data = await authService.register({email, phone, password, userName})
        res.status(200).json({
            message: "user registered successful",
            data
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"error occured to register", error:error.message})
    }
    
}

const login = async(req, res)=>{

    try{
        //login function
    
        const {email, password} = req.body
        if(!email || !password){throw new Error("User credentials missing")}
    
        const data = await authService.login({email, password})

        const payload = {
            id: data._id,
            userName:data.userName,
            email : data.email,
            phone : data.phone,
            role : data.role
        }

        const token = createToken(payload)
        res.cookie('authToken',token)


        
        res.status(200).json({
            message: "Login Successful",
            data,
            token
        })

    }catch(error){
        console.log(error.message)
        res.status(400).send(error.message)
    }
}

export{register, login}