import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';



function App() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState({})
  

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
        <button onClick={logout} className='logout-btn'>Logout</button>
      </div>}
        
        <Routes>
          <Route path ='/' element={<UserLogin/>}/>
          <Route element = {isLogged ? <Outlet/> : <Navigate to ="/"/>}>
            <Route path='/home' element = {<Home/>} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
