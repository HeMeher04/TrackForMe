const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();


authRouter.post("/signup", async(req,res)=>{
    try{
        const {firstName, lastName, emailID, password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({firstName, lastName, emailID, password:hashPassword});
        await user.save();
        res.status(201).send(`${firstName} added sucessfully Please Login`);
    }
    catch(err){
        res.status(400).send("signup"+err.message);
    }
})

authRouter.post("/login", async(req,res)=>{
    try{
        const {emailID, password} = req.body;
        const user = await User.findOne({emailID});
        if(!user){
            return res.status(400).send("Invalid Email");
        }
        const isPassSame= await bcrypt.compare(password,user.password);
        if(!isPassSame){
            return res.status(400).send("Invalid Password");
        }
        const token = await jwt.sign({_id:user._id}, process.env.Secret_Key,{expiresIn:'7d'});

        res.cookie("token",token,{expires : new Date(Date.now()+45*3600000)})
        res.send(`${user.firstName} login sucessful.`)
    }
    catch(err){
        res.status(400).send("login"+err.message);
    }
})


authRouter.post("/logout", async(req,res)=>{
    try {
        res.cookie("token",null,
            {expires: new Date(Date.now())}
        )
        res.send("Logout Sucessful");
    }
    catch (err) {
        res.status(400).send("Error in Logout: " + err);
    }
})

module.exports = authRouter;