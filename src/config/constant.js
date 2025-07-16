import dotenv from 'dotenv';   
dotenv.config(); 

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const MONGO_URI = process.env.PORT || 4000;

export default(PORT, MONGO_URI, EMAIL_USER, EMAIL_PASS)