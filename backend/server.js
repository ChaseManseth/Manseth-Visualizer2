require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
var passport = require('passport');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 
    'mongodb+srv://' + process.env.MDB_USERNAME + ':' + process.env.MDB_PASSWORD
    + process.env.MDB_URL;
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

// db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// append /api for our http requests
// app.use('/api', router);


app.get('/', (req, res) => {
  res.send('login successful');
});

app.get('/fail', (req, res) => {
  res.send('login failed');
});

// Working on Passport Google OAuth 2.0
app.post('/oauth2', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/fail'}));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));