// Importing helper to create JWT token
import { createToken } from "../helpers/tokens.js"

// Importing service that handles registration and login logic
import authService from "../services/authService.js"

// Importing jsonwebtoken (though not used directly here, used in token creation internally)


// Register controller function
const register = async(req, res) => {
    try {
        // Destructuring input from request body
        const { email, phone, password, confirmPassword, userName } = req.body

        // Check for missing fields
        if (!password || !email || !phone || !confirmPassword || !userName) {
            return res.status(400).json({ message: "user credentials missing" })
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "password donot match" })
        }

        // Register the user using authService
        const data = await authService.register({ email, phone, password, userName })

        // Respond with success message and user data
        res.status(200).json({
            message: "user registered successful",
            data
        })
    } catch (error) {
        // Handle errors
        console.log(error.message)
        res.status(500).json({ message: "error occured to register", error: error.message })
    }
}


// Login controller function
const login = async(req, res) => {
    try {
        // Destructuring email and password from request body
        const { email, password } = req.body

        // Throw error if credentials are missing
        if (!email || !password) {
            throw new Error("User credentials missing")
        }

        // Authenticate user using authService
        const data = await authService.login({ email, password })

        // Create payload for JWT token
        const payload = {
            id: data._id,
            userName: data.userName,
            email: data.email,
            phone: data.phone,
            role: data.role
        }

        // Generate token using helper function
        const token = createToken(payload)

        // Set token in cookie
        res.cookie('authToken', token)

        // Respond with success, user data, and token
        res.status(200).json({
            message: "Login Successful",
            data,
            token
        })

    } catch (error) {
        // Handle errors
        console.log(error.message)
        res.status(400).send(error.message)
    }
}

//forgot password function
const forgotPassword = async(req, res)=>{
    try {
        const{email} = req.body
    if(!email){throw new Error("Email is required")}

    const data = await authService.forgotPassword({email})

    res.status(200).json({
        message: "otp sent successfully",
        data
    })
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.nessage)
    }
}

// Export the register and login controller functions
export { login, register, forgotPassword }

