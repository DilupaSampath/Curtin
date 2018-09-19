'use strict'
//Import express
const express = require('express');
//Import cross origins
const cors=require('cors');
//import MongoDB
var mongoose = require('mongoose');
//Import Configurations 
const config = require('./config/config');
//inorder to execute passportConfig.js file
require('./config/passportConfig');

//inorder to do authentication
const passport = require('passport');

//import controllers js
const routes = require('./routes');

//create express server
const server = express();
//Allow cross origins
server.use(cors());
//set routes
server.use(routes);

//Set constant server port
const server_port = config.web_port;
//Database Connection initiation

mongoose.connect('mongodb:'+config.database);
var database = mongoose.connection;
mongoose.Promise=global.Promise;

//start server...
server.listen(server_port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('server listening on port : '+server_port);
});


