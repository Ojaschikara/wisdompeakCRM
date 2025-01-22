const express = require("express");
const UserModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//registration
userRouter.post("/register",(req,res)=>{
    const{userName,email,password,role} = req.body;
try {
   bcrypt.hash(password, 2, async(err, hash)=> {
        // Store hash in your password DB.
        if(err){
            res.status(500).json({
                message:"error in hashing",
                err
            })
        }
        if(hash){
            const user = new UserModel({
                userName,
                email,
                password:hash,
                role
              })
            await user.save()
             res.status(200).json({
                message:"User Registered successfully",
                user
            })
        }
    });   
} catch (error) {
    res.status(500).json({
        message:"error in registereing",
        error
    })
}
})

//Login
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
     
       const user = await UserModel.findOne({
            email
        })
        if(!user){
         return  res.status(500).json({msg:"User Not found"})
        }
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
              if(result){
                const token = jwt.sign({id : user._id}, process.env.SECRET_KEY);
                res.status(201).json({
                    msg:` login successfully`,
                    token
                })
            
              }else{
                res.status(501).json({
                    message:`Incorrect password${err}`
                })
              }

            })
           
        }
       
       
    } catch (error) {
        res.status(500).json({msg:"error in registration"})
    }
})

//UserShow
userRouter.get("/",async(req,res)=>{
    try {
        const users = await UserModel.find()
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            
            error
        }) 
    }
})

userRouter.delete("/delete/:id",async(req,res)=>{
    const uid = req.params.id
    try {
        const users = await UserModel.findByIdAndDelete({_id:uid})
        
     return   res.status(200).json({
            message:"user deleted successfully",
            users
        })
    } catch (error) {
        res.status(500).json({
            
            error
        }) 
    }
})

module.exports = userRouter;