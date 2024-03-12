const mongoose = require('mongoose');

const databaseUserSchema = mongoose.Schema({
    email:{type:String, unique:true, require:true},
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    gender:{type:String, require:true},
    age:{type:String, require:true},
    mobile:{type:String, require:true},
    password:{type:String, require:true}

}, {
    timestamp:true, versionKey:false
});

const usersModel = mongoose.model('users', databaseUserSchema);
module.exports=usersModel;