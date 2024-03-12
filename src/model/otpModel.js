const mongoose = require('mongoose');

const databaseOtpSchema = mongoose.Schema({
    email:{type:String, require:true},
    otp:{type:String, require:true},
    status:{type:String, require:true}
    

}, {
    timestamp:true, versionKey:false
});

const otpModel = mongoose.model('otpList', databaseOtpSchema);
module.exports=otpModel;