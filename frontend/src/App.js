import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import Dashboard from './pages/Dashboard';
import Header from './components/Header'
;
import Register from './pages/Register';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { login, register ,lcoalReducer} from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const distpatch=useDispatch()
  useEffect(()=>{
    const {name,email}=localStorage.getItem('user')
    if(name){

      const userData={name, email}
      distpatch(lcoalReducer(userData))
    }
  },[])

  return (<>
  

    <Router>
    <div className="conatiner">

      <Header/>
       <Routes>
       
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element ={<Register/>}/> 
          
       </Routes>
      <Footer/>
    </div>

    </Router>

  <ToastContainer/>
  
  </>
  )}


export default App;
