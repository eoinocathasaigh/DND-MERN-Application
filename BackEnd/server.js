//Server for this application - handling sending, updating & receiving data
const express = require('express');
const app = express();
const port = 4000;

//Use Functions for this program
//Cors - enables communication between the frontend and backend when running on different domains or ports
const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Connection code for our database
const mongoose = require('mongoose');
//Connects us to our database using the connection string
mongoose.connect('mongodb+srv://admin:admin@cluster0.e9tim.mongodb.net/DNDDB');

//Data Models for this app
//This will help us store data to send to the database
const sessionSchema = new mongoose.Schema({
    title: String,
    campaign: String,
    information: String,
    logo: String
});

//Making the session model & adding to it
const sessionModel = new mongoose.model('mySessions', sessionSchema);

