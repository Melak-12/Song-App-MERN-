import axios from 'axios'


const API_URL='api/songs/'

//create new song

const createSong=async(songData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log("song data to databse",songData)

    const response=await axios.post(API_URL,songData,config)
        console.log("respose is",response.data)
    return response.data
}

//get user songs 
const getSong=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL,config)
    return response.data
}

//delete  user songs 
const deleteSong=async(songId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(API_URL+songId,config)
    return response.data
}

const songService={
    createSong  ,
    getSong,
    deleteSong
}
export default songService 
