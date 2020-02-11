const User = require('../models/user');

module.exports = {
    // Has the user email been used
    isEmailUsed(req, res, next) {
        const email = req.body.email;
        User.findOne({ email: email}).exec()
        .then((user) => {
            if(user === null) {
                next();
            } else {
                return res.status(400).send({
                    error: 'Email is already in use!'
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    },

    // If email is found it DB then continue to the next request
    isEmailValid(req, res, next) {
        const email = req.body.email;
        User.findOne({ email: email}).exec()
        .then((user) => {
            if(user !== null) {
                next();
            } else {
                return res.status(403).send({
                    error: 'Incorrect Email'
                })
            }
        }).catch((err) => console.log(err));
    },

    // Check if the user has a valid JWT token
    isValidated(req, res, next) {

    }
}