const express=require('express')
const app=express()
const {DBconnection}=require('./database/db.js');
const User=require('./models/users.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config();


DBconnection();

app.get("/",(req,res)=>{
    res.send("Welcome to today's class!");
});
app.post("register",async (req,res)=>{
    console.log(req);
    try {
        //try to get all data from request body
        const {firstname,lastname,email,password}=req.body;
        //check that all the data exist
        if(!(firstname&&lastname&&email&&password))
            {
                return res.status(400).send("Please enter all the required fields!")
            }



        //check user alreaady exists
        const existingUser=await User.findOne({email});
        if(existingUser)
            {
                return res.status(400).send("User already exists!");
            }





        //encrypt the password
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);


        
        //save the user to database
        const user=await User.create({

            firstname,
            lastname,
            email,
            password: hashPassword,
        }); 





        //generate a token for user and send it
        const token= jwt.sign({id:user._id,email},process.env.SECRET_KEY,{

            expiresIn:"1h"
        });
        user.token=token;
        user.password=undefined;
        res.status(201).json({
            message:"You have successfully registered!",
            user

        });


        //send the response
        }catch (error) {
        console.log("error")
        
    }



});





app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});