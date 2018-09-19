var config = {};

config.web_port = 3000;
config.database = "//localhost:27017/curtin";
config.imageSavePath = "./uploads";
module.exports = config;


//Reference : MEAN Stack User Registration Using Node JS - Part 1 [Internet]. 2018 [cited 15 August 2018]. Available from: https://youtu.be/m34FCkBd7UU

//Inorder to configure Node.JS API using configuration data found in config.json

//Check the environment
var env = process.env.NODE_ENV || 'development';

// Fetch environment configuration data
var config = require('./config.json');
var envConfig = config[env];

// Add environment config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);