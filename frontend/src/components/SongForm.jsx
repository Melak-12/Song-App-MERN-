import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSong } from "../features/songs/songSlice"

const SongForm = () => {

  const [text,setText]=useState('')
  const [album,setAlbum]=useState('')
  const [duration,setDuration]=useState('')
  const [year,setYear]=useState(0)
  const [links,setLink]=useState('')


  const dispatch=useDispatch()

  const [openForm,setOpenForm]=useState(false)
  const formDisplay=()=>{
    setOpenForm(prev=>!prev)
  }
  const onSubmit=e=>{
    e.preventDefault()
    const songData={
      artist:text,
      album:album,
      duration:duration,
      year:year,
      songLink:links
      
  }
    dispatch(createSong(songData))
    console.log("text from song form"+text)
    setText('')
  }

  return (<>
  <button className="btn1"  onClick={formDisplay}  style={{backgroundColor:openForm?"red":""}}>{openForm?"Close":"Add Song"}</button>

  <section className="form" style={{display:openForm?"":"none"}}>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Song</label>
          <input type="text" name="song" id="text" 
          placeholder="Add your Song"
           value={text}
          onChange={(e)=>setText(e.target.value)}/>
          
        </div>
        <div className="form-group">
          <label htmlFor="album">Album</label>
          <input type="text" name="album" id="album" 
          placeholder="Add your album"
           value={album}
          onChange={(e)=>setAlbum(e.target.value)}/>
          
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input type="text" name="duration" id="duration" 
          placeholder="Add dutation"
           value={duration}
          onChange={(e)=>setDuration(e.target.value)}/>
          
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="number" name="year" id="year" 
          placeholder="Add realise year of Song"
           value={year}
          onChange={(e)=>setYear(e.target.value)}/>
          
        </div>
        <div className="form-group">
          <label htmlFor="link">Song Link</label>
          <input type="text" name="link" id="link" 
          placeholder="Add  link of Song"
           value={links}
          onChange={(e)=>setLink(e.target.value)}/>
          
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">ADD SONG</button>
        </div>
      </form>
    </section>
    
 

     
  </>
  )
}

export default SongForm