const express=require('express');

const app = new express();

const router = require('./src/route/api');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const hpp = require('hpp');

const cors = require('cors');

const mongoose = require('mongoose');


app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));
app.use(rateLimit({windowMs: 15*60*100, max: 3000}));


let url="mongodb://localhost:27017/toDoList";
let option={user:"", pass:"", autoIndex: true};
mongoose.connect(url, option).then(()=>{
    console.log("connected to the database successfully ... ");
}).catch((error)=>{
    console.log(error);
});




app.use("/api",router);
app.use("*",(req, res)=>{
    res.status(404).json({data:"Not found ... "});
});







module.exports=app;