import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email:{
    type: String,
    unique: true
  },

  password:{
    type: String,
  }, 

  
},{timestamps:true});

const userModel = mongoose.model('User', userSchema);

export default userModel;