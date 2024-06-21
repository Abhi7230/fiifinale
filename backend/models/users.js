const mongoose=require('mongoose');
const { type } = require('os');

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true//dena hi hoga
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('User',userSchema);