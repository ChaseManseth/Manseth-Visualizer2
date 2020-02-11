var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const { isEmailUsed } = require('../middleware/userMiddleware');


router.get('/', (req, res) => {
    res.send('Auth world');
});


// TODO:
// -Need to error handle
// -Need to sign and send the jwt as a response
router.post('/register', isEmailUsed, (req, res, next) => {
    var body = req.body;
    const saltRounds = 10;

    // Checking if all parameters are present
    if(!body.email || !body.password) {
        res.status(400).send('Invalid email or password');
    }

    // Time to encrypt the password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var user = new User({email: body.email, password: hash});

            user.save((err, user) => {
                if(err) return console.log(err);
                res.status(200).send('User Created successfully');
            });
           
        });
    });
});

module.exports = router;