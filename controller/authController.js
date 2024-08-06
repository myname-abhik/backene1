const User  =require(`../models/userModel`);
const createError = require(`../utils/appErrors`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
//Register User
exports.signup =  async(req, res , next)=>{
try {
const user = await User.findOne({email: req.body.email})
if(user){
    return next  (new createError("User already exists",400))
}
// const file = req.files.photo
// cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
const hashedPassword = await bcrypt.hash(req.body.password,12)
const newUser = await User.create({
    ...req.body,
    password : hashedPassword,
})
// Assign JWT WEB Token
const token = jwt.sign({ id :newUser._id}, "secretkey123",{
    expiresIn : "90d"
})
res.status(201).json({
    status : "success",
     message : "User created successfully",
     user :{
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        role:newUser.role,
        token
     },
    
})
// })
}

catch(error)
{
   next(error)
}
}
// Login User
exports.login =  async(req, res , next)=>{
  try
  {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user)
    {
        return next(new createError("User not found",404))
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
    {
        return next(new createError("Incorrect password",401))
    }
    const token = jwt.sign({ id :user._id}, "secretkey123",{
    expiresIn : "90d"
})
res.status(200).json({
    status : "success",
     message : "User loggedin successfully",
     user :{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        photo:user.photo,
        token
     }
    
    
})
 console.log("User logged in successfully")
    }
  catch
  {
    next(error)
  }
}
exports.upload =  async(req, res , next)=>{
    try
    {
        const file = req.files.photo
        const user = await User.findOne({email: req.body.email})
if(user){
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      await  User.updateOne(
            { email:  req.body.email },
             {$set: { photo: result.secure_url  }},
        )
        res.status(200).json({
            status : "success",
            message : req.body.name,
            photo : result.secure_url
        })
    }) 
}
}
    catch
    {
        next(error)
    }
}

exports.upload1 =  async(req, res , next)=>{
    try
    {
        
        const user = await User.findOne({email: req.body.email})
if(user){
    console.log(user)
          res.send({
            message : "User already has a photo",
            photo : user.photo
          })
   
}
}
    catch
    {
       next (error)
    }
}