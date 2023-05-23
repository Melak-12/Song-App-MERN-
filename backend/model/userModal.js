const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add your username !']
    },
    email:{
        type:String,
        required:[true,'please add your email !'],
        unique:true
    },
    password:{
        type:String,
    
        required:[true,'please add your paswword !']
    }
},{
    timeStamps:true
})
module.exports=mongoose.model('User',userSchema)