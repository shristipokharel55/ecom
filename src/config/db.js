import mongoose from "mongoose"
import { adminSeeders } from "../seeders/adminSeeders.js"


const connectDb = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully")

        adminSeeders()

    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb;