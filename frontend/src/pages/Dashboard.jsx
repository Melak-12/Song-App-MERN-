import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { getSongs, reset } from '../features/songs/songSlice';
import SongForm from '../components/SongForm';
import SongItem from '../components/SongItem';
import { useDispatch, useSelector } from 'react-redux';


const Dashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  // const {user}=useSelector((state)=>state.auth)

  const [user, setUser] = useState(null);

  const { songs, isLoading, isError, message } = useSelector((state) => state.song)
  // console.warn('user is ',user)
  // console.warn('name is ',user.name)

  // const localUser=localStorage.getItem('user')

  // console.log("local user is:"+localUser)

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString);

    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    else {
      setUser(user); // Set user data in state

      dispatch(getSongs())
    }
    return () => {
      //  dispatch(reset())
    }
  }, [message, navigate, isError, dispatch])


  if (isLoading) {
    return <Spinner />
  }
  // "proxy":"https://songapi-rust.vercel.app/",
// 
  return (
    <>

      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <span className="search inline" style={{ display: "flex", justifyContent: "right" }}>
          <input type="text" name="song" id="text"
            placeholder="search Song"
          />
          <span style={{ color: "grey", paddingTop: 4 }}><ion-icon name="search-outline"></ion-icon></span>
        </span>
        <p>Songs Dashboard</p>
      </section>

      <SongForm />
      <section className="content">
        {songs.length > 0 ? (
          <div className="songs">
            {
              songs.map((song) => (
                //  console.log(song.song,"is song")
                <SongItem key={song._id} song={song} />
              ))

            }
          </div>
        ) : (
          <h3>you have not set any songs</h3>

        )}
      </section>

    </>
  )
}
export default Dashboard