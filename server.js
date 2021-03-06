require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');


// Imported Routes
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/user');


const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 
    'mongodb+srv://' + process.env.MDB_USERNAME + ':' + process.env.MDB_PASSWORD
    + process.env.MDB_URL;
console.log(dbRoute);
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Production use. Used to serve up the frontend build file
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build/'));
    console.log('I am prod');

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));