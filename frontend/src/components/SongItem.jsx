import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSong } from '../features/songs/songSlice'
// import {axios} from 'axios'

const SongItem = ({song}) => {
    const dispatch=useDispatch()
// const options = {
//   method: 'GET',
//   url: 'https://freepd.p.rapidapi.com/p/2',
//   headers: {
//     'X-RapidAPI-Key': 'ed336f8c0dmshc1c1e00eb79a5a1p1b9074jsnf438fb111e09',
//     'X-RapidAPI-Host': 'freepd.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
  return (
   
      <div className="song" style={{borderRadius:9}}>
        <div>
            {/* {new Date(song.createdAt).toLocaleString('en-US')} */}
            <h2 style={{color:'#075a55'}}><ion-icon name="musical-notes"></ion-icon> &nbsp;&nbsp;&nbsp;&nbsp;<a href={song.songLink} style={{textDecoration:"none", color:'#075a55'}}className='h2'>{song.song}</a></h2>
            <p>Album:&nbsp;&nbsp;{song.album}</p>
            <i style={{color:"green"}}>{song.duration}</i> <br />
            <h6>&nbsp;realise year:{song.year}</h6>
            <button onClick={()=>dispatch(deleteSong(song._id))} className='close' color='primary' style={{text:"bold"}}><ion-icon name="trash-outline"></ion-icon></button>
        </div>
      </div>
    
  )
}

export default SongItem
