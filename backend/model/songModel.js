 const mongoose =require('mongoose');
 const songSchema =mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
   }, 
   
   
   song:{
        type:String,
        required:[true,'please add a song from modelss'],
        
    },
   
   album:{
         type:String,
         required:[true,'please add album']
       },
       duration:{
         type:String,
         required:[true,'please add the song duration ']
    
       },
       year:{
         type:Number,
         required:[true,'please add relised  year']
       },
       songLink:{
        type:String,
        required:[true,'please add song link']
       }
 },
 {
   timeStamps:true
})
 module.exports=mongoose.model('Song',songSchema)
   