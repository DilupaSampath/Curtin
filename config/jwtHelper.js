//Used an Online YouTube Tutorial as Guidance
//Reference : 1. YouTube. MEAN Stack Jwt Authentication in Node JS API - Part 1 [Internet]. 2018 [cited 28 August 2018]. Available from: https://youtu.be/T8qepiTbJi4

//define function for jwt verification

//required statements
const jwt = require('jsonwebtoken');

//function
module.exports.verifyJwtToken = (req, res, next) => {
    var token; //local variable to store the token sent from client side

    //check whether client request contains the jwt token in request header
    if('authorization' in req.headers){
        //extract request header
        token = req.headers['authorization'].split(' ')[1];
    }
        //check whether jwt object is not saved in token
    if(!token){
            return res.status(403).send({auth:false, message: 'No Token Found in Client Header'});
    }

    else{
        //there is a token
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            if(err)
                return res.status(500).send({ auth: false, message: 'Authentication of Token Failed'});

            else{
                req._id = decoded._id;
                next();
            }
        })
    }
}