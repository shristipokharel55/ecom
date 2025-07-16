// // Importing helper to create JWT token
// import { createToken } from "../helpers/tokens.js"

// // Importing service that handles registration and login logic
// import authService from "../services/authService.js"

// // Importing jsonwebtoken (though not used directly here, used in token creation internally)


// // Register controller function
// const register = async(req, res) => {
//     try {
//         // Destructuring input from request body
//         const { email, phone, password, confirmPassword, userName } = req.body

//         // Check for missing fields
//         if (!password || !email || !phone || !confirmPassword || !userName) {
//             return res.status(400).json({ message: "user credentials missing" })
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "password donot match" })
//         }

//         // Register the user using authService
//         const data = await authService.register({ email, phone, password, userName })

//         // Respond with success message and user data
//         res.status(200).json({
//             message: "user registered successful",
//             data
//         })
//     } catch (error) {
//         // Handle errors
//         console.log(error.message)
//         res.status(500).json({ message: "error occured to register", error: error.message })
//     }
// }


// // Login controller function
// const login = async(req, res) => {
//     try {
//         // Destructuring email and password from request body
//         const { email, password } = req.body

//         // Throw error if credentials are missing
//         if (!email || !password) {
//             throw new Error("User credentials missing")
//         }

//         // Authenticate user using authService
//         const data = await authService.login({ email, password })

//         // Create payload for JWT token
//         const payload = {
//             id: data._id,
//             userName: data.userName,
//             email: data.email,
//             phone: data.phone,
//             role: data.role
//         }

//         // Generate token using helper function
//         const token = createToken(payload)

//         // Set token in cookie
//         res.cookie('authToken', token)

//         // Respond with success, user data, and token
//         res.status(200).json({
//             message: "Login Successful",
//             data,
//             token
//         })

//     } catch (error) {
//         // Handle errors
//         console.log(error.message)
//         res.status(400).send(error.message)
//     }
// }

// //forgot password function
// const forgotPassword = async(req, res)=>{
//     try {
//         const{email}=req.body;

//         if(!email){
//             throw new Error("Email is required")
//         }
        
//         const data = await authService.forgotPassword({email})

//         res.send(data)
//     } catch (error) {
//         console.log(error.message)
//         res.send(error.message)
//     }
// }

// const verifyOtp = async(req, res)=>{
//     try {
//         const{email, otp}=req.body

//         if(!email || !otp){
//             throw new Error("Email and Otp Required")
//         }

//         const data = await authService.verifyOtp({email, otp})

//         res.status(200).json({data})

//     } catch (error) {
//         console.log(error.message)
//         res.send(error.message)
//     }
// }

// // Export the register and login controller functions
// export { forgotPassword, login, register, verifyOtp }



import { createToken } from "../helpers/tokens.js";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import authService from "../Services/authService.js";

const register = async (req, res) => {
  try {
    const { email, phone, password, confirmPassword, userName } = req.body;

    if (!password || !email || !phone || !confirmPassword || !userName) {
      return res.status(400).json({ message: "user credentials missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password donot match" });
    }

    const data = await authService.register({
      email,
      phone,
      password,
      userName,
    });
    res.status(200).json({
      message: "user registered successful",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "error occured to register", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).json({message:"user credentials missing"})
      throw new Error("user credentials missing");
    }
    const data = await authService.login({ email, password });
    const payload = {
      id: data._id,
      role: data.role,
      phone: data.phone,
      email: data.email,
    };
    const token = createToken(payload);
    res.cookie("authToken", token);
    res.status(200).json({
      message: "login successful",
      data,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "error occurred during login", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    res.cookie("userEmail", email);

    console.log("email", email);

    if (!email) {
      throw new Error("Email is required");
    }
    const data = await authService.forgotPassword({ email });

    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.userEmail;

    if (!email || !otp) throw new Error("Email and otp required");

    const doEmailExist = await Otp.findOne({ email });

    if (!doEmailExist) {
      throw new Error("Email doesn't exist!");
    }

    await User.findOneAndUpdate(
      { email },
      { otpExpiresAt: new Date(Date.now() + 30 * 1000) },
      { new: true }
    );

    await Otp.deleteOne({ email });

    if (doEmailExist == otp) {
      throw new Error("Invallid Otp");
    }
    res.status(200).json({
      message: "Otp validated",
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
export { register, login, forgotPassword, verifyOtp };
