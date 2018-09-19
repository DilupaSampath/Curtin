//Used an Online YouTube Tutorial as Guidance
//Reference : 1. YouTube. MEAN Stack Jwt Authentication in Node JS API - Part 1 [Internet]. 2018 [cited 28 August 2018]. Available from: https://youtu.be/T8qepiTbJi4


//required statements for packages
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

//In order to interact with MongoDB, for that we store User Schema inside User variable
// var User = mongoose.model('User');
const User = require('../models/user.model');
//Configure Authentication
passport.use(
    new localStrategy(
        {usernameField: 'email'}, (username,password,done) => {
            User.findOne({email: username},
            (err,user)=>{
                console.log("passport");
                if(err)
                    return done(err);

                else if(!user)//Invalid User
                    return done(null, false, {message: 'There is no user with this email. Please try again or Sign Up'});
                
                else if(!user.verifyPassword(password))//Incorrect password
                    return done(null, false, {message: 'The password you entered is incorrect'});
                
                else //Successful authentication
                    return done(null, user);
            });
        }
    )
);