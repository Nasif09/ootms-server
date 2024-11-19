const response = require("../helpers/response");
var jwt = require('jsonwebtoken');


const tokenVerify = (req,res,next)=>{
    const {authorization} = req.headers;
    try{
        let token = authorization.split(" ")[1];
        if(token){
            const decoded  = jwt.verify(token, process.env.JWT_SECRECT);
            req.User = decoded;
            next();
        }else{
            return res.status(400).json(response({ status: 'Not found', statusCode: '404', type: 'user', message: "token data not found", errors: error.message }));
        }
    }catch(error){
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "tokenVerify Failed", errors: error.message }));
    }
}


module.exports  = tokenVerify;