const jwt =require("jsonwebtoken")
const UserModel = require("../models/user.model");

const dotenv = require("dotenv").config();

const auth = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(502).json({
            message:"Token not found"
        })
    }
    try {
        const decoded= jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            res.status(502).json({
                message:"Invalid token please login again "
            } )
        }
        const user = await UserModel.findById(decoded.id)
        req.user = user;
        next()
        
    } catch (error) {
        res.status(502).json({
            message:`invalid token ${error}`
        })
    }
}

module.exports = auth;