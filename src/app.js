const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

app.use(express.json());

const authRouter = require("./routes/auth.js");
app.use("/",authRouter);

const connectDB = async(req,res) =>{
    await mongoose.connect(`${process.env.URI}/${process.env.DB_Name}`);
}
connectDB()
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(3333,()=>{
        console.log("Server is running on port 3333");
    })
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
})