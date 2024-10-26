import { compare } from "bcrypt";
import User from "../models/auth.models.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, { expiresIn: maxAge }); // Token expires in 3 days
};


const signup = async (req, res) => {
  try {
    const {firstName, email, password } = req.body;

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({firstName, email, password });
    // Create a token with email and user ID
    const token = createToken(email, user.id);
    res.cookie("jwt", token, {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).
    json({ message: "Server Error:", err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with the given email not found" });
    }


    const auth = await compare(password, user.password)
    if (!auth) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(email, user.id);
    res.cookie("jwt", token, {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
        color: user.color
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error:", err });
  }
};


export {signup,login}
