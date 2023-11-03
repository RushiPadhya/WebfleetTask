
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors =require("cors");
const app = express();
const Updatevehicle = require('./Update')
const nodemailer=require('nodemailer')
const jwt =require('jsonwebtoken')


const crypto = require('crypto');
const { error } = require('console');
const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);




//email config

const trasporter = nodemailer.createTransport({
    
      service:"gmail",
      auth:{
        user:"mailto:rushi.syndell@gmail.com",
        pass:"Rpadhya7290"
      }

})


mongoose.connect('mongodb://127.0.0.1:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});


app.use(cors());


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tokens: [
    {
        token: {
            type: String,
            required: true,
        }
    }
], verifytoken:{
  type: String,
}
});

const User = mongoose.model('collection1', userSchema);

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;


  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});



//ADD VEHICLE

const vehicleSchema = new mongoose.Schema({
  taxDueDate: String,
  year: String,
  vehicleType: String,
  engineCapacity: String,
  lastV5CIssued: String ,
  wheelPlan: String,
  typeApproval: String,
});
const vehiclemodule = mongoose.model('vehicledetails', vehicleSchema);


app.use(express.json());

app.post('/vehicles', async (req, res) => {
  try {
    const newVehicle = new vehiclemodule(req.body);
    await newVehicle.save();
    res.status(201).send(newVehicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/vehiclesfetch', (req, res) => {
  vehiclemodule.find()
    .then(city => res.json(city))
    .catch(err => {
       console.error('Error fetching data:', err);
       res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.put('/vehiclesfetch/:id', Updatevehicle);


// ...

app.delete('/vehiclesfetch/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehicle = await vehiclemodule.findByIdAndRemove(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// send mail link for reset password

app.post("/sendpasswordlink", async(req,res)=>{
  console.log(req.body);

   const {email} =req.body;

   if(!email){
    res.status(401).json({status:401,message:"Enter Your Email"});
   }
    try {

         const userfind= await User.findOne({username:email});
      
         //token generate for reset password
         const token= jwt.sign({_id:userfind._id},secretKey,{
          expiresIn:"120s"
         })

         const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
   
        //  console.log(setusertoken);

        if(setusertoken){
          const mailOptions={
            from:"mailto:rushi.syndell@gmail.com",
            to:email,
            subject:"Sending Email For Password Reset",
            text:`This Link is valid for 2 Minutes : http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`

          }
          trasporter.sendMail(mailOptions,(error,info)=>{
            if(error){
              console.log("error",error);
              res.status(401).json({status:401,message:"email not send"})
          }else{
              console.log("Email sent",info.response);
              res.status(201).json({status:201,message:"Email sent Succsfully"})
          }
          })
        }
      
    } catch (error) {
      res.status(401).json({status:401,message:"Invalid User"})
    }

})

app.listen(5000, () => {
  console.log(`Server is running...`);
});
