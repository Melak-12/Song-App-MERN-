import React, { useEffect, useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })
  const {email,password}=formData
const localUser=localStorage.getItem('user')

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isError,isSuccess,isLoadign,message}=useSelector((state)=>state.auth)

  useEffect(()=>{

      if(isError){
        // toast.error(message)
        alert(message)
      }

      if(isSuccess||user){
        navigate('/')
      }
      
    // dispatch(reset())

  },[user,isError,isSuccess,message,dispatch,navigate,localUser])


  const onChange=(e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
    console.log("your name is: "+[e.target.value])
  }

  const onSubmit=(e)=>{
      
    e.preventDefault()

      const userData={email,password}
      dispatch(login(userData))
    
  }
  if(isLoadign){
    return <Spinner/>
  }

  return <>  

    <section className='heading'>
        <h1><FaSignInAlt/>Log in</h1>
        <p>Please login and start setting Songs ! </p>
    </section>  

    <section className='form'>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <input 
            type="email" 
            className='form-control' 
            id='email'
            name='email'
            value={email}
            placeholder='Enter your Email '
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className='form-control' 
            id='password'
            name='password'
            value={password}
            placeholder='Enter your password '
            onChange={onChange}/>
        </div>
        
        <div className="form-group">
          <button className='btn btn-block'type='submit '>Submit</button>
        </div>
      </form>
    </section>
    
    </>
  
}

export default Login
