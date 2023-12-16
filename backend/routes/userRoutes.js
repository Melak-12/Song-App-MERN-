const express=require('express')
const {registerUser, loginUser, getMe}=require('../controller/userContrtoller')
const router=express.Router()

// const {protect}= require('../middleware/userMiddware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',getMe)
// router.get('/me',protect,getMe)



module.exports=router