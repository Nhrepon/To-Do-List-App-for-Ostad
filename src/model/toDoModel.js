const mongoose = require('mongoose');

const databaseToDoSchema = mongoose.Schema({
    email:{type:String, require:true},
    title:{type:String, require:true},
    description:{type:String, require:true},
    status:{type:String, require:true}
    

}, {
    timestamp:true, versionKey:false
});

const toDoModel = mongoose.model('toDoList', databaseToDoSchema);
module.exports=toDoModel;