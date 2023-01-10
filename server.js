// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependancies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 3000;

// listening
const listening = () => {
  console.log("server running");
  console.log(`server is running on port ${port}`);
};

// Setup Server
const server = app.listen(port, listening);

/**
* @description getData retrive the user's data to the client side
* @param {object} req
* @param {object} res
*/
const getData = (req, res) => {
  res.send(projectData);
};

// respond with the most recent entry data
app.get("/getMostRecentEntry", getData);

/**
* @description postData Stors the user's data in projectData obj
* @param {object} req
* @param {object} res
*/
const postData = (req, res) => {
  projectData = req.body;
};

// add the post data
app.post("/addWeather", postData);
