const path= require('path')
const express = require('express');
const dotenv =require('dotenv').config();
const colors =require('colors')
const connectDB=require('./config/db')
const port = process.env.PORT || 5000
// const {errorHandler}=require('./middleware/errorMiddleware')
//insert cores
const cors=require('cors')
connectDB();
const app =express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/api/songs',require('./routes/songRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

//serve frontend
/*
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'./build')))

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'./','build','index.html')))
}
else{
    app.get('/' , (req , res)=>{
    
       res.send('set to prodctioin :)')
    
    })
}

*/
//try to accept client on other

app.use(cors(
   {
    origin:["http://localhost:3001"]
}
))
//


console.log("ready for frontend")
// app.use(errorHandler)
app.listen(port,()=>console.log(`server started at port ${port}`.bgGreen.white))
