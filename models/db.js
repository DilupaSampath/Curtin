//request statement for mongoose
const mongoose = require('mongoose');

//import user model
require('./user.model');

//calling connect function in mongoose
//current URL string parser is deprecated, and will be removedin a future version. To use the new parser, I have passed option { useNewUrlParser: true } 
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, (err)=>{
    if(err)
    {
        console.log('ERROR :( - Could not connected to MongoDB : ' + JSON.stringify(err, undefined ,2));
    }

    else
    {
        console.log('Connected to MongoDB Sucessfully :D ');   
    }
});