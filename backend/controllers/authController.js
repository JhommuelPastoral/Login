import userModel from "../models/user.js";
import validator from 'validator';
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';


export const test = async (req,res)=>{
  res.json("Test is working");

}


export const login = async (req,res)=>{
  try {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ error: "No user Found" }); 
    }

    const match = await comparePassword(password, user.password);

    if(match){
      jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET,{expiresIn: '1d'}, (err, token)=>{
        if(err){
          throw err
        }
        res.cookie('token', token, {
          httpOnly: true,
          secure: true, // required if using HTTPS (which Render does)
          sameSite: 'None', // allows cross-site cookies
        }).json(user);

      });

    } 

    if(!match){
      return res.json({ error: "Password does not match" }); 

    }

  } catch (error) {
    console.log(error.message);
  }

}

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "Invalid Credentials" }); 
    }

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.json({ error: 'Email already exists' }); 
    }

    if(!validator.isEmail(email)){
      return res.json({ error: 'Invalid Email Address' }); 

    }

    if(!validator.isStrongPassword(password)){
      return res.json({ error: 'Password too weak. Try mixing letters, numbers, and symbols.' }); 
    }
    const hash = await hashPassword(password);
    const user = await userModel.create({ email, password:hash });
    return res.status(201).json({ message: 'Succesfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json(null);

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(401).json(null); // or { error: "Unauthorized" }
    }
    res.json(user);
  });
};
