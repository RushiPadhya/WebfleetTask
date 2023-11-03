const express = require('express');
const router = express.Router();





let vehicles = [];  

router.put('/vehiclesfetch/:id', (req,res)=>{
  const {id}=req.params;
  const { taxDueDate, year, vehicleType, engineCapacity, lastV5CIssued, wheelPlan, typeApproval } = req.body;

  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

  if (vehicleIndex !== -1) {
    
    vehicles[vehicleIndex] = {
      id,
      taxDueDate,
      year,
      vehicleType,
      engineCapacity,
      lastV5CIssued,
      wheelPlan,
      typeApproval,
    };

    res.status(200).json(vehicles[vehicleIndex]);

  } else {

    res.status(404).json({ message: 'Vehicle not found' });

  }

});

module.exports = router;    