// // Importing mongoose to define schema and interact with MongoDB
// import mongoose from "mongoose";

// // Defining the schema for the User model
// const userSchema = new mongoose.Schema({

//     // Username field - required string
//     userName: {
//         type: String,
//         required: true
//     },

//     // Email field - must be unique and required
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },

//     // Password field - required string
//     password: {
//         type: String,
//         required: true
//     },

//     // Phone field - optional number
//     phone: {
//         type: Number
//     },

//     // Role field - can be either 'ADMIN' or 'CUSTOMER', defaults to 'CUSTOMER'
//     role: {
//         type: String,
//         enum: ['ADMIN', 'CUSTOMER'],
//         default: 'CUSTOMER'
//     },
//     otpExpiresAt:{
//         type : Date,
//         default: false
//     }

// }, {
//     // Automatically adds createdAt and updatedAt timestamps
//     timestamps: true
// });

// // Creating the User model from the schema
// const User = mongoose.model('User', userSchema);

// // Exporting the User model to use in other parts of the app
// export default User;



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
