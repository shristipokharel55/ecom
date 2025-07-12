// Importing mongoose for MongoDB connection
import mongoose from "mongoose"

// Importing the adminSeeder function to seed default admin data after DB connection
import { adminSeeders } from "../seeders/adminSeeders.js"

// Asynchronous function to connect to MongoDB
const connectDb = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully")

        // Seed default admin data once the connection is successful
        adminSeeders()

    } catch (error) {
        // Log any error that occurs during the connection process
        console.log(error.message)
    }
}

// Exporting the DB connection function to use in other parts of the application
export default connectDb;
