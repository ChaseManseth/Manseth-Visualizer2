var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models and Middleware
const User = require('../models/user');
const { isEmailUsed, isEmailValid } = require('../middleware/userMiddleware');

// TODO: need to deal with error pages
router.get('/', (req, res) => {
    res.send('Auth world');
});

// REGISTER
router.post('/register', isEmailUsed, (req, res) => {
    var body = req.body;
    const saltRounds = 10;

    // Checking if all parameters are present
    if(!body.email || !body.password) {
        res.status(400).send({
            error: 'Invalid email or password'
        });
    }

    // Time to encrypt the password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var user = new User({email: body.email, password: hash});

            user.save((err, user) => {
                if(err) {
                    res.status(500).send({
                        error: 'There was an error creating the account'
                    });
                } else {
                    // Generate the JWT
                    var token = jwt.sign({
                        user: {
                            _id: user._id,
                            email: user.email
                        }
                    }, process.env.JWT_SECRET);

                    // Sending the JWT token in the response
                    res.status(201).send({jwt: token});
                }
            });
           
        });
    });
});

// LOGIN
router.post('/login', isEmailValid, (req, res) => {
    const body = req.body;
    var email, password;

    // Checking to make sure that the email and password are present
    if(!body.email || !body.password) {
        res.status(400).send({
            error: 'Email or password is not present!'
        });
    } else {
        email = body.email;
        password = body.password;
    }

    // Find the user
    User.findOne({email: body.email}).exec()
    .then((user) => {
        if(user !== null) {
            bcrypt.compare(password, user.password, (err, result) => {
                // If password is valid generate JWT and return it
                if(result === true) {
                    var token = jwt.sign({
                        user: {
                            _id: user._id,
                            email: user.email
                        }
                    }, process.env.JWT_SECRET);

                    res.status(200).send({jwt: token});
                }

                // Invalid Password
                else {
                    res.status(400).json({
                        error: 'Incorrect Password'
                    });
                }
            })
        } 
        // No user is found which should never happen
        else {
            res.status(403).json({
                error: 'User not found!'
            });
        }
    })
    .catch((err) => console.log(err));

});

module.exports = router;