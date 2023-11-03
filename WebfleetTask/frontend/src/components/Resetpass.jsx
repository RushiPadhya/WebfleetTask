
import React, { useState } from 'react';
import axios from 'axios';
import "./Style.css";
import { CContainer,CCol, CRow} from '@coreui/react';
import Logo from "../img/logo.png";
import { Link , useNavigate   } from 'react-router-dom';

const Resetpass = () => {

    const[email,setMail]= useState("");
    const[message,setMessage]= useState("");


    const setVal=(e)=>{
        setMail(e.target.value)
    }
    const senLink= async(e)=>{
               e.preventDefault();
               const res = await fetch('/sendpasswordlink',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
               });
               const data = await res.json();

               if(data.status === 201){
                setMail("")
                setMessage("Password Reset Link Sent Successfully");
               }else{
                console.log("Invalid User");
               }
    }

  return (
    <div className='login d-flex align-items-center justify-content-center '>
      <CContainer className='border rounded'>    
       <CRow>
          <CCol lg={6} sm={12} className='py-5 px-5 d-flex align-item-center justify-content-center flex-column '>
            <h1>Enter Your Email</h1>

            {message ? <p style={{ color: 'green', fontWeight: "bold" }}>{message}</p> : null}
                      <form >
                    <input 
                      type="text"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={setVal}
                      className='mt-3 w-75'
                      required
                    /><br/>
                
                    <button type="submit" className='mt-3 btn btn-danger' onClick={senLink}>Send</button><br/><br/>
                  </form> 
                  <CRow>
                    <CCol>
                        <Link to="/" className='text-decoration-none'>Back To Login Page</Link>
                    </CCol>
                  </CRow>
                  
          </CCol>
          <CCol lg={6} sm={12} className='right-content py-5'>
            <div className="text-center p-3">
                  <img src={Logo} alt="logo" className='logo' />
                  <p className='text-center mx-auto py-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
           
          </CCol>
       </CRow>
    </CContainer>
  </div>
  )
}

export default Resetpass