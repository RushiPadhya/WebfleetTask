import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import UserIcon from "../img/usricon.png";
import UserImg from "../img/userimg.png"
import Logo from "../img/logo.png";
import {CCol, CRow} from '@coreui/react';
import Dash from '../img/Dash.svg'
import Side3 from "../img/side3.svg"
import Side4 from "../img/side4.svg"
import Side5 from "../img/side5.svg"
import Side6 from "../img/side6.svg"
import Sicon from '../img/icon.svg'



const Dashboard = (vehicle) => {

  const lists = [
    { id: 1, title: "All" },
    { id: 2, title: "Assigned" },
    { id: 3, title: "Unassigned" },
    { id: 4, title: "Archived" },
  ];
  const [selected, setSelected] = useState(0);
  const [state, setState] = useState({
    name: "bob",
    color: "Black"
  });

  const handleColor = (row) => {
    setSelected(row.id);
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddVehicleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  //Insert Data

  const [formData, setFormData] = useState({
    taxDueDate: '',
    year: '',
    vehicleType: '',
    engineCapacity: '',
    lastV5CIssued: '',
    wheelPlan: '',
    typeApproval: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  // Display Stored and New Ineserted Data

  const [allVehicleData, setAllVehicleData] = useState([]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/vehicles', {
        taxDueDate: formData.taxDueDate,
        year: formData.year,
        vehicleType: formData.vehicleType,
        engineCapacity: formData.engineCapacity,
        lastV5CIssued: formData.lastV5CIssued,
        wheelPlan: formData.wheelPlan,
        typeApproval: formData.typeApproval,
      });
      console.log(response.data);
      setAllVehicleData((prevData) => [...prevData, response.data]);
      handleCloseModal();
      setFormData('')
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };
  
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vehiclesfetch');
        const formattedData = response.data.map((item) => {
          const date1 = new Date(item.taxDueDate);
          const date2 = new Date(item.lastV5CIssued);
          const formattedDate1 = `${date1.getDate()} ${date1.toLocaleString('default', { month: 'long' })} ${date1.getFullYear()}`;
          const formattedDate2 = `${date2.getDate()} ${date2.toLocaleString('default', { month: 'long' })} ${date2.getFullYear()}`;

          return { ...item, taxDueDate: formattedDate1 , lastV5CIssued: formattedDate2};
        });
  
        setAllVehicleData(formattedData);
       
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };
  
    fetchVehicleData();
  }, []);

 
    // Update Inserted Data

    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
      id: null,
      taxDueDate: '',
      year: '',
      vehicleType: '',
      engineCapacity: '',
      lastV5CIssued: '',
      wheelPlan: '',
      typeApproval: '',
    });

    
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  
    const handleEditClick = (vehicle) => {
      setEditFormData(vehicle);
      setShowEditModal(true);
    };
  
    const handleUpdate = async () => {
      const { id, taxDueDate, year, vehicleType, engineCapacity, lastV5CIssued, wheelPlan, typeApproval } = editFormData;
      try {
        const response = await axios.put(`http://localhost:5000/vehiclesfetch/${id}`, {
          taxDueDate,
          year,
          vehicleType,
          engineCapacity,
          lastV5CIssued,
          wheelPlan,
          typeApproval,
        });
        console.log('Updated vehicle:', response.data);
    
        const updatedData = response.data;
        setAllVehicleData((prevData) =>
          prevData.map((vehicle) => (vehicle._id === id ? { ...vehicle, ...updatedData } : vehicle))
        );
    
        setShowEditModal(false);
      } catch (error) {
        console.error('Error updating vehicle:', error);
      }
    };
    

    // Delete
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/vehicles/${id}`);
        setAllVehicleData((prevData) => prevData.filter((vehicle) => vehicle._id !== id));
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    };
    



  return (
    <>

    {/* //Navbar */}
        <CRow>
                <CCol lg={3} xxl={2}  sm={3} md={3} className='dashboard-logo text-center p-2'> 
                        <img src={Logo} alt="logo" height={58} width={230} />
                </CCol>
                 <CCol lg={9} xxl={10} sm={9} md={9} className='dashboard-bar flex-row '>
                  
               <CRow>
                <CCol lg={8}></CCol>

                <CCol lg={4} className='d-none d-lg-block'>
                        <div className="user-info mt-3 mt-lg-2 d-flex justify-content-end align-items-center ">
                        <img width="30" height="30" src={UserIcon} alt="bell" />
                        <div className="user-img px-2">
                        <img width="40" height="40" src={UserImg} alt="UserImg"/>
                      </div>
                      <div className="user-name ">
                               <span className='ms-3'>Dicky</span><br />
                               <span className='ms-3'>Admin</span>
                      </div>
                 </div>
                </CCol>
               </CRow>
            </CCol> 
          </CRow>
      
  {/* Sidebar */}
  <CRow>

  <CCol lg={3}  xxl={2} className='side-bar pt-4 pt-sm-2 side-bar-bg '>
        <div className="nav-list d-flex justify-content-center align-items-start ">         
                  <ol>
                    <li><img src={Dash} height={25} width={25} className='me-3' alt='img'/>Dashboard</li>
                    <li><img src={Side3} height={25} width={25} className='me-3' alt='img'/>Vehicle Management</li>
                    <li><img src={Side4} height={25} width={25} className='me-3' alt='img'/>Driver Management</li>
                    <li><img src={Side5} height={25} width={25} className='me-3' alt='img'/>User Management</li>
                    <li><img src={Side6} height={25} width={25} className='me-3' alt='img'/>Maintenance</li>
                  </ol>   
      </div>   
  </CCol>

    <CCol lg={3}  xxl={10} className=' p-5'>
    <CRow>
        <CCol sm={12} className='Vehicle-content'>
            <h4>Vehicle Assignment</h4>
        </CCol>
      </CRow>

      <CRow className='mt-4'>
        <CCol sm={12} className='Vehicle-status '>
        {lists.map((list) => (
        <button
          key={list.id}
          onClick={() => handleColor(list)}
          style={{ color: list.id === selected ? "red" : "" }}
        >
          {list.title}
        </button>
      ))}
        </CCol>
      </CRow>
      <CRow className='mt-4'>
                <CCol>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><img src={Sicon} alt="sicon" className='p-1' /></div>
                  </div>
                  <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search"/>
                </div>
                </CCol>
                <CCol>
                  <button type="button" className='btn btn-danger ms-3' onClick={handleAddVehicleClick}>Add Vehicle</button> 
                </CCol>
      </CRow>

      {/* Insert Model */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Vehicle Details</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
            
                <form onSubmit={handleSubmit} method='POST'>
                <div className="mb-3">
                    <label htmlFor="taxDueDate" className="form-label">Tax Due Date</label>
                    <input type="text" className="form-control" id="taxDueDate" name='taxDueDate' value={formData.taxDueDate} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" name='year' value={formData.year} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                    <input type="text" className="form-control" id="vehicleType" name='vehicleType' value={formData.vehicleType} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="engineCapacity" className="form-label">Engine Capacity</label>
                    <input type="text" className="form-control" id="engineCapacity" name='engineCapacity' value={formData.engineCapacity} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastV5CIssued" className="form-label">Last V5C Issued</label>
                    <input type="text" className="form-control" id="lastV5CIssued" name='lastV5CIssued' value={formData.lastV5CIssued} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="wheelPlan" className="form-label">Wheel Plan</label>
                    <input type="text" className="form-control" id="wheelPlan" name='wheelPlan' value={formData.wheelPlan} onChange={handleChange} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="typeApproval" className="form-label">Type Approval</label>
                    <input type="text" className="form-control" id="typeApproval" name='typeApproval' value={formData.typeApproval} onChange={handleChange} required/>
                  </div>
                  <button type="submit" className="btn btn-danger">Add</button>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      )}
        {/* Update Model */}
      {showEditModal  && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Vehicle Details</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
            
                <form onSubmit={handleUpdate} method="PUT">
                <div className="mb-3">
                    <label htmlFor="taxDueDate" className="form-label">Tax Due Date</label>
                    <input type="text" className="form-control" id="taxDueDate" name='taxDueDate' value={editFormData.taxDueDate} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" name='year' value={editFormData.year} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                    <input type="text" className="form-control" id="vehicleType" name='vehicleType' value={editFormData.vehicleType} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="engineCapacity" className="form-label">Engine Capacity</label>
                    <input type="text" className="form-control" id="engineCapacity" name='engineCapacity' value={editFormData.engineCapacity} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastV5CIssued" className="form-label">Last V5C Issued</label>
                    <input type="text" className="form-control" id="lastV5CIssued" name='lastV5CIssued' value={editFormData.lastV5CIssued} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="wheelPlan" className="form-label">Wheel Plan</label>
                    <input type="text" className="form-control" id="wheelPlan" name='wheelPlan' value={editFormData.wheelPlan} onChange={handleEditChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="typeApproval" className="form-label">Type Approval</label>
                    <input type="text" className="form-control" id="typeApproval" name='typeApproval' value={editFormData.typeApproval} onChange={handleEditChange} />
                  </div>
                  <button type="submit" className="btn btn-success">Update</button>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      )}     
    


      <div className="row d-flex justify-content-start align-items-center mt-4">
              <div className="col-7 w-75">
                
              <table className="table">
                                <thead className='text-center'>
                                  <tr>
                                    <th scope="col">Tax Due Date</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Vehicle Type</th> 
                                    <th scope="col">Engine Capacity</th>
                                    <th scope="col">Last V5C Issued</th>
                                    <th scope="col">Wheel Plan</th>
                                    <th scope="col">Type Approval</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                  </tr>
                                </thead>
                                <tbody className='text-center'>
                                {Array.isArray(allVehicleData) && allVehicleData.map((vehicle, index) => (
                                                  <tr key={index}>
                                                    <td>{vehicle.taxDueDate}</td>
                                                    <td>{vehicle.year}</td>
                                                    <td>{vehicle.vehicleType}</td>
                                                    <td>{vehicle.engineCapacity}</td>
                                                    <td>{vehicle.lastV5CIssued}</td>
                                                    <td>{vehicle.wheelPlan}</td>
                                                    <td>{vehicle.typeApproval}</td>
                                                    <td><button type="button" className='btn btn-success' onClick={() => handleEditClick(vehicle)}>Edit</button></td>
                                                    <td><button type="button" className='btn btn-danger'onClick={() => handleDelete(vehicle._id)}>Delete</button></td>
                                                  </tr>
                                                ))}
                                </tbody>
                </table>
              </div>
             </div>
   </CCol> 
  </CRow>
 
  
        
   

    </>
  )
}

export default Dashboard
