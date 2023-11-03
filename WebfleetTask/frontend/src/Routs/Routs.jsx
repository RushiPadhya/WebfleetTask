import React from 'react'
import App from '../components/App';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Forgotpass from '../components/Forgotpass';
import Dashboard from '../components/Dashboard';
import Resetpass from '../components/Resetpass';



const Routs = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/forgot-pass/:id/token' element={<Forgotpass/>}/> 
            <Route path='/reset-pass' element={<Resetpass/>}/>  
        </Routes>
    </Router>
    </>
  )
}

export default Routs
