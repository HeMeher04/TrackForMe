const mongoose = require("mongoose");
const validator = require("validator");


const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:30
    },
    emailID:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Password");
            }
        }
    },
},{timestamps : true});

const User= mongoose.model("User",userSchema);
module.exports = User;