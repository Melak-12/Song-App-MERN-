const asyncHandler=require('express-async-handler')

const Song =require('../model/songModel')
const User=require('../model/userModal')


//@disc get songs 
// @route GET/api/songs
// @access private
const getSong=asyncHandler(async (req,res)=>{
    const songs=await Song.find({user:req.user.id});
    res.status(200).json(songs);
    console.log("get  songs !!!".cyan)
})

//@𝕕͟𝕚͟𝕤͟𝕔 𝕤͟𝕖͟𝕥 𝕤͟𝕠͟𝕟͟𝕘͟𝕤 
// @route POST/api/songs
// @access private
const setSong= asyncHandler(async(req,res)=>{
    if(!req.body){
        res.status(400);
        throw new Error('please add artist filed')

    }
    const songs = await Song.create({
        song:req.body.artist,
        album:req.body.album,
        duration:req.body.duration,
        year:req.body.year,
        songLink:req.body.songLink,
        user:req.user.id,
    })
    console.log(req.body) 
    res.json(songs)

})

//@disc update songs 
// @route put/api/songs/id
// @access private
const updateSong=asyncHandler(async(req,res)=>{
    const songs=await Song.findById(req.params.id);
    if(!songs){
        res.status(400)
        throw new Error('song not found!')
    }

    // const user=await User.findById(req.user.id)
    if(!req.user){
        res.status(911)
        throw new Error('user doesnt exist!')
    }

    //make sure the loged in user matchs the songs user
    if(songs.user.toString()!==req.user.id){
        res.status(911)
        throw new Error('user not authorized!')
    }

    const updatedSong=await Song.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedSong)
   
})
//@disc delte songs 
// @route delte/api/songs/id
// @access private
const deleteSong=asyncHandler(async(req,res)=>{
    const songs=await Song.findById(req.params.id);
    if(!songs){
        res.status(400)
        throw new Error('song not found!')
    }

    // const user=await User.findById(req.user.id)
    if(!req.user){
        res.status(911)
        throw new Error('user doesnt exist!')
    }

    //make sure the loged in user matchs the songs user
    if(songs.user.toString()!==req.user.id){
        res.status(911)
        throw new Error('user not authorized!')
    }
// await songs.remove()
  await Song.findByIdAndDelete(req.params.id)

    res.status(400).json({id:req.params.id})
})


module.exports={
    getSong ,setSong,updateSong,deleteSong
}