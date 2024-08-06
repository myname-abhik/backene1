const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    
    password : {
        type : String,
        unique : true,
        required : true
    },
    role : {
        type : String,
       default: 'user'
    },
    photo :{
        type : String,
        default: null   
    }
})
const User  = mongoose.model('User',userSchema) 
 module.exports = User