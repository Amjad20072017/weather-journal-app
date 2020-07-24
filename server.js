// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 3000;
app.listen(port, listening);

function listening() {
    console.log(`server running on localhost: ${port}`);
}

// GET route to retrieve projectData to client side
app.get('/all', (req, res) => {
    res.json(projectData);
});

// POST route for receiving temperature , date and userResponse from the request body and update projectDate
app.post('/addData', (req, res) => {
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
    res.json(projectData);
});