const usersModel = require('../model/usersModel');
const jwt = require('jsonwebtoken');
const otpModel = require('../model/otpModel');
const emailSend = require('../utility/emailSend');


//  User Registration controller
exports.userRegistration = async (req, res)=>{
    try{
        const reqBody = req.body;
        await usersModel.create(reqBody);
        res.json({status: "success", message: "User registration success ... "});
    }catch(error){
        res.json({status: "Error", message: "User registration fail ... "});
    }
}



//  User login controller
exports.userLogin = async (req, res)=>{
    try{
        const reqBody = req.body;
        const user = await usersModel.find(reqBody);
        if(user.length>0){
            const payload = {exp:Math.floor(Date.now()/1000)+(24*60*60), data:reqBody['email']};
            const token = jwt.sign(payload, "1234-abcd");
            res.json({status: "success", message: "User login success ... ", token:token});
        }else{
            res.json({status: "fail", message: "User not found ... "});
        }
        
    }catch(error){
        res.json({status: "Error", message: "User login fail ... "});
    }
}



//  User profile read controller
exports.userProfileRead = async (req,res)=>{
    try{
        const email=req.headers['email'];
        const result=await usersModel.find({email:email});
        res.json({status:"success", data:result});
    }catch(error){
        res.json({status: "Error", message: "User profile read fail ... "});
    }
}





//  User profile update controller
exports.userProfileUpdate = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const reqBody = req.body;
        await usersModel.updateOne({email:email}, reqBody);
        
        res.json({status: "success", message: "User profile update success ... "});
    }catch(error){
        res.json({status: "Error", message: "User profile update fail ... "});
    }
}





//   User auth by JWT token controller
exports.userEmailVerify = async (req, res)=>{
    try{
        const {email} = req.params;
        const user = await usersModel.find({email:email});
        if(user.length > 0){
            const otp = Math.floor(10000+Math.random()*900000);
            await emailSend(email, `Your otp is ${otp}`, "User email verification otp ");
            await otpModel.create({email: email, otp: otp, status: "active"});
            res.json({status: "success", message: "User email verification code send success ... "});
        }else{
            res.json({status: "fail", message: "User email verification send fail ... "});
        }
        
        
    }catch(error){
        res.json({status: "Error", message: "User profile update fail ... "});
    }
}





exports.userOtpVerify = async (req, res)=>{
    try{
        const {email, otp} = req.params;
        const user = await otpModel.find({email:email, otp: otp, status: "active"});
        if(user.length > 0){
            await otpModel.updateOne({email: email, otp: otp}, {status:"verified"});
            res.json({status: "success", message: "User otp verification success ... "});
        }else{
            res.json({status: "fail", message: "User otp verification fail ... "});
        }
        
        
    }catch(error){
        res.json({status: "Error", message: "User profile update fail ... "});
    }
}





exports.userPasswordReset = async (req, res)=>{
    try{
        const {email, otp, password} = req.params;
        const user = await otpModel.find({email:email, otp: otp, status: "verified"});
        if(user.length > 0){
            await otpModel.deleteOne({email: email, otp: otp});
            await usersModel.updateOne({email: email}, {password: password});
            res.json({status: "success", message: "User password reset success ... "});
        }else{
            res.json({status: "fail", message: "User password reset fail ... "});
        }
        
        
    }catch(error){
        res.json({status: "Error", message: "User profile update fail ... "});
    }
}