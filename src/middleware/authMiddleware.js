const jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    const token = req.headers['token'];
    jwt.verify(token, '1234-abcd', (error, success)=>{
        if(error){
            res.status(401).json({status:"unauthorized"});
        }else{
            req.headers.email=success['data'];
            next();
        }
    });
}