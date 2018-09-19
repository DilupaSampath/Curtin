//defines a function for user registration
const callBackResponse = require('../services/callBackResponseService');
const mongoose = require('mongoose');

// const User = require('../models/user.model');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

//function for user registration
module.exports.register = (req, res, next) => {

    console.log("req.body.email --> " + req.body.email);
    //object of User model


    User.find({ "username": req.body.username }, function (err, user) {
        console.log(user.length);
        if (err) {

            next(callBackResponse.callbackWithfalseMessage(err));

        } else if (user == null || user == undefined || user.length == 0) {

            User.find({ "email": req.body.email }, function (err, user2) {

                if (err) {
                    console.log('2nd ');
                } else if (user2 == null || user2 == undefined || user2.length == 0) {
                    var user = new User();

                    //retrieve values from req parameter to user
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.password = req.body.password;
                    user.save((err, doc) => {
                        if (!err) {
                            console.log('User registration details saved Sucessfully :D ');
                            res.send(doc);

                        }

                        else {
                            console.log('already');
                            res.status(422).send(['A User with this email already exists']);

                        }
                    });

                } else {
                    console.log('already last');
                    res.status(422).send(['A User with this email already exists']);
                }

            });
        } else {
            //user name exist
            console.log("here");
            res.status(422).send(['A User name with already exists']);

        }

    }
    );
    //save user record


}

//Used an Online YouTube Tutorial as Guidance
//Reference : 1. YouTube. MEAN Stack Jwt Authentication in Node JS API - Part 1 [Internet]. 2018 [cited 28 August 2018]. Available from: https://youtu.be/T8qepiTbJi4


//route function for sending username and password for authentication
module.exports.authenticate = (req, res, next) => {
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {

        if (err)
            return res.status(400).json(err); //if there is any error

        //Valid User
        else if (user)
            return res.status(200).json({ "token": user.generateJwt() });

        //Invalid User or Incorrect password
        else
            return res.status(404).json(info);
    })(req, res);
}

//Used an Online YouTube Tutorial as Guidance
//Reference : 1. YouTube. MEAN Stack Jwt Authentication in Node JS API - Part 1 [Internet]. 2018 [cited 28 August 2018]. Available from: https://youtu.be/T8qepiTbJi4


//function to display userProfile
module.exports.userProfile = (req, res, next) => {

    User.findOne({ _id: req._id }, (err, user) => {

        if (!user) {
            //there is no user record with the given _id
            return res.status(404).json({ status: false, message: 'User Record Unavailable' });
        }

        else {
            //there is a user with the give _id
            return res.status(200).json({ status: true, user: _.pick(user, ['username', 'email']) });
        }

    })
}