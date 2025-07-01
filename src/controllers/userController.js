import userServices from "../services/userServices.js";


const createUser = async (req,res)=>{

    const {userName,password,phone,email} = req.body

    const data =  await  userServices.createUser(req.body)
    
    res.send(data)

}


export { createUser };
