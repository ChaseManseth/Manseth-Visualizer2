var express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models and Middleware
const User = require('../models/user');
const { isEmailUsed, isEmailValid } = require('../middleware/userMiddleware');

// Need to handle Error Pages
router.get('/', (req, res) => {
    res.send('User world');
});

// Check if user email exists in the system
router.post('/emailCheck', (req, res) => {
    const email = req.body.email;
    User.findOne({ email: email}).exec()
        .then((user) => {
            if(user !== null) {
                return res.status(200).json({valid: true});
            } else {
                return res.status(200).json({valid: false});
            }
        }).catch((err) => {
            return res.status(500).send({
                error: 'Internal Server Error'
            })
        });
});


module.exports = router;