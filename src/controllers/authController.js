import authService from "../services/authService.js"


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

export{register}