
import React, { useState } from 'react';
import axios from 'axios';
import "./Style.css";
import { CContainer,CCol, CRow} from '@coreui/react';
import Logo from "../img/logo.png";
import { Link , useNavigate   } from 'react-router-dom';



const App = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
     
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid username or password');
    }
    setUsername('');
    setPassword('');
  };

 



  return (
    <>

<div className='login d-flex align-items-center justify-content-center '>
      <CContainer className='border rounded'>    
       <CRow>
          <CCol lg={6} sm={12} className='py-5 px-5 d-flex align-item-center justify-content-center flex-column '>
            <h1>Login</h1>

                          {errorMessage && <p>{errorMessage}</p>}

                      <form onSubmit={handleSubmit}>
                    <input 
                      type="text"
                      placeholder="Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='mt-3 w-75'
                      required
                    /><br/>
                    <input 
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='mt-3 w-75'
                      required
                    /><br/>

                    <Link to={"/reset-pass"} className='mt-5 text-decoration-none'>Forgot Password....!!</Link><br />
                    
                  
                    <button type="submit" className='mt-3 btn btn-danger'>Login</button>
                  </form> 
                  
             {/* Forgotpass */}

        

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
       
    </>
    
  );
};

export default App;
