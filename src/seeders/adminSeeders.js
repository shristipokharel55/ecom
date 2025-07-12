// Importing the User model to interact with the users collection in MongoDB
import User from "../models/User.js";

// Importing a utility function to securely hash passwords
import { hashPassword } from "../utils/utility.js";

// Asynchronous function to seed a default admin user into the database
const adminSeeders = async () => {
    // Check if an admin user with the given email already exists
    const adminFound = await User.findOne({ email: "admin@gmail.com" });

    // If no admin user is found, create one
    if (!adminFound) {
        // Hash the default password for security
        const password = hashPassword('admin');

        // Create a new admin user with default credentials
        await User.create({
            userName: "admin",
            password,
            email: "admin@gmail.com",
            phone: 9810594474,
            role: "ADMIN"
        });

        // Log success message
        console.log("admin seeded successfully");
    } else {
        // If admin already exists, log a message
        console.log("Admin already exists");
    }
}

// Exporting the adminSeeder function to use it in other parts of the project
export { adminSeeders };
