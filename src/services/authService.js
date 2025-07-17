// import bcrypt from 'bcrypt'
// import Otp from '../models/Otp.js'
// import User from '../models/User.js'
// import { generateOtp } from '../utils/generateOtp.js'
// import { sendMail } from '../utils/sendMail.js'
// import { hashPassword } from '../utils/utility.js'


// const register = async (data)=>{
//     const hashedPassword = hashPassword(data.password)

//     const email = data.email
//     const userExist = await User.find({email})
//     console.log(userExist)

//     if(userExist.length>0){
//         new Error('user already exist')
//     }

//     return await User.create({
//         email : email,
//         password : hashedPassword,
//         userName : data.userName,
//         phone : data.phone
//     })

// }

// const login = async(data)=>{
//     const doEmailExist = await User.find({email:data.email})

//     if (!doEmailExist.length>0){
//         console.log("email dont exist")
//         throw new Error("Invalid Email")
//     }

//     const dbPassword = doEmailExist[0].password
//     const isPasswordMatched = bcrypt.compareSync(data.password,dbPassword)

//     if (isPasswordMatched){
//         return doEmailExist[0];
//     }
//     else{
//         throw new Error("Password didn't match")
//     }

// }

// const forgotPassword = async (data)=>{


//     const isUserValid = await User.findOne({email: data.email})

//     if(!isUserValid){throw new Error("User is not registered")}

//     const otp = generateOtp();

//         const doEmailExist = await Otp.findOne({email: data.email})
        
//         let newOtp;

//         if(!doEmailExist){

//             newOtp = await Otp.create({
//             email:data.email,
//             otp:otp,
//         })
//         } else {
//             newOtp = await Otp.findOneAndUpdate(
//                 { email: data.email },
//                 { otp: otp, 
//                 createdAt: new Date() },
//                 { new: true }
//             );
//         }

            
//         sendMail(data.email, otp)



//     return newOtp
// }

// const verifyOtp = async({email, otp})=>{
//     const doEmailExist = await Otp.findOne({email})


//         if(!doEmailExist){
//             throw new Error("Email doesn't exist!")

//         }

//         await Otp.deleteOne({email})

//         if(doEmailExist.otp !== otp){throw new Error("Invallid Otp")}

//         await User.findOneAndUpdate(
//             {email},
//             {canChangePassword: true},
//             {new:true})

//         await Otp.deleteOne({email})

//         return "Otpp validated"
// }

// export default {register, login, forgotPassword, verifyOtp}




import bcrypt from "bcrypt";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/generateOtp.js";
// import { sendMail } from "../utils/sendMail.js";
import { hashPassword } from "../utils/utility.js";
import User from "../models/User.js";

const register = async (data) => {
  const hashedPassword = hashPassword(data.password, 10);

  const email = data.email;
  const userExist = await User.find({ email });
  console.log(userExist);

  if (userExist.length > 0) {
    new Error("user already exist");
  }

  return await User.create({
    email: email,
    password: hashedPassword,
    userName: data.userName,
    phone: data.phone,
  });
};

const login = async (data) => {
  const doEmailExist = await User.find({ email: data.email });

  if (!doEmailExist.length > 0) {
    console.log("email dont exist");
    throw new Error("Invalid Email");
  }

  const dbPassword = doEmailExist[0].password;
  const isPasswordMatched = bcrypt.compareSync(data.password, dbPassword);

  if (isPasswordMatched) {
    return doEmailExist[0];
  } else {
    throw new Error("Password didn't match");
  }
};

const forgotPassword = async (data) => {
  const isUserValid = await User.findOne({ email: data.email });

  if (!isUserValid) {
    throw new Error("User is not registered");
  }

  const otp = generateOtp();

  const doEmailExist = await Otp.findOne({ email: data.email });

  let newOtp;

  if (!doEmailExist) {
    newOtp = await Otp.create({
      email: data.email,
      otp: otp,
    });
  } else {
    newOtp = await Otp.findOneAndUpdate(
      { email: data.email },
      { otp: otp, createdAt: new Date() },
      { new: true }
    );
  }

  // sendMail(data.email, otp);

  return newOtp;
};
const verifyOtp = async ({ email, otp }) => {
  const doesExist = await Otp.findOne({ email });

  if (!doesExist) {
    throw new Error("Email doesn't exist");
  }

  if (doesExist.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await User.findOneAndUpdate(
    { email },
    { otpExpiresAt: new Date(Date.now() + 30 * 1000) },
    { new: true }
  );

  //optional
  await Otp.deleteOne({ email });
  return "verifyOtp";
};

export default { register, login, forgotPassword, verifyOtp };
