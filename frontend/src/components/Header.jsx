import React from 'react'
import {FaSignInAlt,FaUser,FaSignOutAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


const Header = () => {

  const {user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  

  const onLogOut=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
  <>
   <header className='header' >
    <div className="logo">
      <Link to='/' >Song App</Link>
    </div>
    <ul>
      {user?(
        <>
        <button className='btn'onClick={onLogOut} style={{color:'white',backgroundColor:'red'}}>
             <FaSignOutAlt/> logout
        </button>
        </>

      ):(
        <>
        
        <li>
            <Link to='/login'>
             <FaSignInAlt/> logIn

            </Link>
        </li>
      
        <li>
            <Link to='/register'>
             <FaUser/>Register
            </Link>
        </li>
        </>
      )}
    </ul>
   </header>
   </>
  )
}

export default Header
