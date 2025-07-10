// Importing the userServices module that contains business logic for user creation
import userServices from "../services/userServices.js";

// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        // Destructuring user input fields from the request body
        const { userName, password, phone, email, confirmPassword } = req.body;

        // Basic validations for required fields
        if (!userName) {
            return res.send("username required");
        }
        if (!password) {
            return res.send("password required");
        }
        if (!email) {
            return res.send("email required");
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.send("password did not match");
        }

        // Call the userServices to create a new user with provided data
        const data = await userServices.createUser(req.body);

        // Send back the created user data as response
        res.send(data);
    } catch (error) {
        // Catch and handle any errors
        console.log(error.message);
        res.status(400).json({
            message: "error occured",
            error: error.message
        });
    }
};

// Export the createUser controller so it can be used in routes
export { createUser };
