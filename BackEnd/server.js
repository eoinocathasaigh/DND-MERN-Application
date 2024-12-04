//Server for this application - handling sending, updating & receiving data
const express = require('express');
const app = express();
const port = 4000;

//Use Functions for this program
//Cors - enables communication between the frontend and backend when running on different domains or ports
const cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
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
const sessionModel = new mongoose.model('sessionNotes', sessionSchema);
//Allow us to parse json out of a http request
const bodyParser = require('body-parser');
const { Navigate } = require('react-router-dom');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.body.title);
    res.send('Session Added');
});

//Handling sending back data when user goes to api/movies
app.get('/api/SessionTracker', async (req, res) => {
    //Await will basically prevent code from going any
    //further until this is completed
    const sessions = await sessionModel.find({});

    //This sends back the following:
    //- A status code denoting success
    //- The movies data in the form of json
    res.status(200).json({ mySessions: sessions });
});

//Method for sending data back to server
//This will basicaslly listen constantly for the response being sent back and will display the appropriate message
app.post('/api/SessionTracker', async (req, res) => {
    console.log(req.body.title);

    const { title, campaign, information, logo } = req.body;

    //This enables us to access the movie model & save the entered details
    const newSession = new sessionModel({ title, campaign, information, logo });
    await newSession.save();

    //Response Message
    res.status(201).json({ message: 'Session details created successfully', session: newSession });
})

//The following will listen for the app.put method
//-Editing
app.get('/api/session/:id', async (req, res) => {
    //Finding the movie needs to be async since we dont know how long it will take to get
    const session = await sessionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(session);
})

//Editing the movies - Ensures the data is set properly
app.put('/api/session/:id', async (req, res) => {
    let session = await sessionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(session);
});

//Deleting 
app.delete('/api/session/:id', async (req, res) => {
    console.log("Deleting Session with ID: ", req.params.id);
    const session = await sessionModel.findByIdAndDelete(req.params.id)
    res.send(session);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});