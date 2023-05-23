const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const colors =require('colors')

const User= require('../model/userModal')
const protect= asyncHandler(async(req,res,next)=>{
let token
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
       
        //get token from header
        token= req.headers.authorization.split(' ')[1]
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        
        //get user form the token
        req.user=await User.findById(decoded.id).select('-password')
        console.log("the users is :".blue+req.user)
    next()
    } catch (error) {
        console.log(error)
        res.status(401)
    throw new Error('invalid authorized')
    }
}
if(!token){
    res.status(402)
    throw new Error('not authorized and not token')
}
})
module.exports={
    protect
}
