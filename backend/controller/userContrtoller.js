const jwt=require('jsonwebtoken')
const bycrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModal')

//@dic user registration
// @route post/api/users
// @access public
const registerUser= asyncHandler(async(req,res)=>{
     const {name, email, password}=req.body
     if(!name||!email||!password){
        res.status(400)
        throw new Error("please add all fields!")
     }

     //check if user exist
     const userExist=await User.findOne({email})
     if(userExist){
        res.status(400)
        throw new Error("user al ready exsit!")
     }

     //hash the password  use bycrypt
     const salt=await bycrypt.genSalt(10);
     const hashPassword=await bycrypt.hash(password,salt)
    
     //creat user
     const user=await User.create({
        name,
        email,
        password:hashPassword

     })
    
     if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })
     }
     else{
        res.status(400)
        throw new Error('invalid user data !')
     }


})

//@dic authenticat a user
// @route post/api/users/login
// @access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    // if(!email||!password){
    //     res.status(400)
    //     throw new Error('please fill all fields')
    // }


    //check if user exist
    const user=await User.findOne({email})
    if (user &&( await bycrypt.compare(password,user.password))) {
      res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
    }
    else{
            res.status(400)
            throw new Error('invalid credentioal !')
    }
  
})
//@dic get user data
// @route get/api/users/me
// @access private

const getMe= asyncHandler(async(req,res)=>{
    // const {_id, name, email}=await User.findById(req.user.id);
    res.status(200).json(req.user)
   
})

//generate JWT
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


module.exports={
    registerUser,
    loginUser,
    getMe
}