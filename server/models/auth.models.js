import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { genSalt, hash } = bcrypt;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  // lastName: {
  //   type: String,
  //   required: [true, "Last Name is required"],
  // },
  // image: {
  //   type: String,
  //   required: true, // Corrected from 'require' to 'required'
  // },
  // color: {
  //   type: Number,
  //   required: false, // Corrected from 'require' to 'required'
  // },
  // profileSetup: {
  //   type: Boolean,
  //   default: false,
  // },
});

userSchema.pre("save", async function (next) {
  try {
    // Hash the password before saving the user
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

const User = mongoose.model("User", userSchema);
export default User;
