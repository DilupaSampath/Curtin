//mongoose model Save User details inside MongoDB collection
'use strict';
//request statement for mongoose
const mongoose = require('mongoose');

//request statement for bcryptjs
const bcrypt = require('bcryptjs');

//request statement for jwt
const jwt = require('jsonwebtoken');



//variable to define user schema
var userSchema = new mongoose.Schema(
    {
        username:{type:String,required:'Username cannot be empty',unique:true},
        email:{type:String, required:'Email cannot be empty',unique:true},
        password:{type:String, required:'Password cannot be empty',minlength:[4,'Password must have atleast 4 characters']},
        saltSecret:String //used for encryption and decryption

    }
);

//Reference : MEAN Stack User Registration Using Node JS - Part 1 [Internet]. 2018 [cited 15 August 2018]. Available from: https://youtu.be/m34FCkBd7UU

//Custom validation for email property
userSchema.path('email').validate((val)=>{
   let emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val);

}, 'Email address you entered is invalid');

//preEvent for save operation 
userSchema.pre('save', function(next){
    console.log("pre event");
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Method to define verifyPassword function
userSchema.methods.verifyPassword = function (password) //password entered
{
    return bcrypt.compareSync(password, this.password); //password entered and encrypted password
};

//Method to generate jwt
userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXP});
}

//register the userSchema object inside mongoose
module.exports = mongoose.model('User', userSchema);


