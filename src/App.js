import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Alert from './Component/Alert';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import UserLogin from './Pages/UserLogin';



function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState({})
  const [profile,setProfile] = useState(null)
  

    onAuthStateChanged(auth, (user) => {
        if(auth.currentUser !== null){
            console.log(isLogged,auth)
            setIsLogged(user);
        }else{
          setIsLogged(null)
        }
    })

    const  logout = async () =>{
      await signOut(auth);
  }
    

  return (
    <Router>
      {isLogged && 
      <div className='navbar'>
        <button onClick={logout} className='logout btn'>Logout</button>
        <Link to={'/profile'} className='profile btn' >Profile</Link>
      </div>}
        <Routes>
          <Route path ='/' element={<UserLogin/>}/>
          <Route element = {isLogged ? <Outlet/> : <Navigate to ="/"/>}>
            <Route path='/home' element = {<Home/>} />
            <Route path='/profile' element = {<Profile/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
