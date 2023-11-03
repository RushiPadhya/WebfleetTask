const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
});



const loginModel = mongoose.model('collection1', loginSchema);

module.exports=loginModel;
