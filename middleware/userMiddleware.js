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

    isEmailValid(req, res, next) {
        const email = req.body.email;
        User.findOne({ email: email}).exec()
        .then((user) => {
            if(user !== null) {
                next();
            } else {
                return res.status(403).send({
                    error: 'Email not recognized'
                })
            }
        }).catch((err) => console.log(err));
    }
}