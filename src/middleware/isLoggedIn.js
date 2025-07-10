    import { verifyToken } from '../helpers/tokens.js';

    const isLoggedIn = (req, res, next)=>{

        try{
            const token = req.cookies.authToken

            if(!token){throw new Error("User not authenticated")}
            
            const decoded = verifyToken(token)
            console.log(decoded)

            req.user = decoded
            next();

        res.send("cookiesss")

        }catch(error){
            console.log(error.message)
            res.send(error.message)
        }


    }

    export { isLoggedIn };
