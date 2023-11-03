import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './components/App'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import Routs from './Routs/Routs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Routs/>
  </React.StrictMode>
);


reportWebVitals();
