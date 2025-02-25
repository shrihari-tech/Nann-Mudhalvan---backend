const express = require('express');
const router = express.Router();
const User = require('../Schema/User');
const Task = require('../Schema/Task');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const generateRandomPassword = ()=>{
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    const allChars = upperCase + lowerCase + number + specialChars;

    let password = '';
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += number.charAt(Math.floor(Math.random() * number.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    for(let i=4;i<8;i++){
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password.split('').sort(()=>Math.random()-0.5).join('');
}


const transporter = nodemailer.createTransport({
   service:"gmail",
    auth:{
        user:'shrihari.bh@kgisl.microcollege.in',
        // pass:'spyz arit ykpl dvzu',
        pass:'spyzaritykpldvzu'
    },
});

router.post('/register',async(req,res)=>{
    try{
        const {username,phone,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            username,
            phone,
            email,
            password: hashedPassword,
        })
        await user.save();
        res.json({message:"User Registered Successfully"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user && bcrypt.compare(password,user.password)){
            res.json({message:"Login Successfull",user});
        }
        else{
            res.json({message:"Login Failed"});
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.put('/update-profile/:userId',async(req,res)=>{
    const {userId} = req.params;
    const {email,username,phone,password,image} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        if(email) user.email = email;
        if(username) user.username = username;
        if(phone) user.phone = phone;
        if(password) user.password = await bcrypt.hash(password,10);
        if(image) user.image = image;
        await user.save();
        res.json({message:"User Updated Successfully"})
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.get('/profile/:userId',async(req,res)=>{
    const {userId} = req.params;
    try{
        const data = await User.findById(userId);
        if(data){
            res.json(data);
        }
        else{
            res.json({message:"User Not Found"});
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const task = await Task.find({ created_by: userId });
        if (task.length > 0) {
            res.json(task);
        } else {
            res.json({ message: "No Task Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/forget-password',async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not found"});
        }
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword,10);
        await User.updateOne({email},{password:hashedPassword});
        const mailOptions = {
            // from:'shrihari.bh@kgisl.microcollege.ac.in',
            to:email,
            subject:'Naan Mudhalvan Reset Password',
            text:`Your new password is ${randomPassword} Please login and change your password.`,
        }
       await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("Error in sending mail",error);
                return res.status(500).json({message:"Error in sending mail"});
            }
            else{
                console.log("Email Send",info.response);
                res.json({message:"Password Reset Successfullt"});
            }
        })
    }
    catch(error){
        console.log("Error in resetting password",error);
        res.status(500).json({error:"Error in resetting password"});
    }
})

module.exports = router;