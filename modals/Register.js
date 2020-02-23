const mongoose = require('mongoose');

//  new User Schema
const registerSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const Register = module.exports = mongoose.model("Register", registerSchema);