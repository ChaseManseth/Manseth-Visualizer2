var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.get('/', (req, res) => {
    res.send('Auth world');
})

router.post('/register', (req, res) => {
    var body = req.body;
    const saltRounds = 10;

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