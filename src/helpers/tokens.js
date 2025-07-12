// Importing the jsonwebtoken library to handle JWT creation and verification
import jwt from 'jsonwebtoken'

// Function to create a JWT token using a given payload
export const createToken = (payload) => {
    // Sign the payload with the secret key and return the token
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

// Function to verify a JWT token
export const verifyToken = (token) => {
    // Verify the token using the same secret key and return the decoded payload
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
