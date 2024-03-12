const toDoModel = require('../model/toDoModel');

exports.userToDoCreate = async (req, res)=>{
    try{
        const email = req.headers['email'];
        let reqBody = req.body;
        reqBody.email=email;
        await toDoModel.create(reqBody);
        res.json({status: "success", message: "User to do create success ... "});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}




exports.userToDoRead = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const data = await toDoModel.find({email:email});
        res.json({status: "success", message: "User to do read success ... ", data:data});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}




exports.userToDoUpdate = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const {id} = req.params;
        const reqBody = req.body;
        await toDoModel.updateOne({_id:id, email:email}, reqBody);
        res.json({status: "success", message: "User to do update success ... "});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}





exports.userToDoDelete = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const {id} = req.params;
        await toDoModel.deleteOne({_id: id , email : email }); 
        
        res.json({status: "success", message: "User to do delete success ... "});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}




exports.userToDoComplete = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const {id} = req.params;
        const reqBody = req.body;
        await toDoModel.updateOne({_id:id, email:email}, reqBody);
        res.json({status: "success", message: "User to do complete success ... "});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}




exports.userToDoCancel = async (req, res)=>{
    try{
        const email = req.headers['email'];
        const {id} = req.params;
        const reqBody = req.body;
        await toDoModel.updateOne({_id:id, email:email}, reqBody);
        res.json({status: "success", message: "User to do cancel success ... "});
    }catch(error){
        res.json({status: "Error", message: "User to do create fail ... "});
    }
}