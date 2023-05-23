import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'  
import {FaUser,} from 'react-icons/fa'
// import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {register,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  
  const {name, email,password,password2}=formData
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

  //  dispatch(reset())

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
    if(password!==password2){
      // toast.error("password doesnt match")
      alert(message)
    }
    else{
      const userData={name, email,password}
      dispatch(register(userData))
    }
  }
  if(isLoadign){
    return <Spinner/>
  }

  return <>  

    <section className='heading'>
        <h1><FaUser/>Register</h1>
        <p>Please create an account </p>
    </section>  

    <section className='form'>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <input 
            type="text" 
            className='form-control' 
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name '
            onChange={onChange}/>
        </div>
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
          <input 
            type="password" 
            className='form-control' 
            id='password2'
            name='password2'
            value={password2}
            placeholder='confirm password'
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <button className='btn btn-block'type='submit '>Submit</button>
        </div>
      </form>
    </section>
    
    </>
  
}

export default Register
