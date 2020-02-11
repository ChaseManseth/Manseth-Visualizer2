const User = require('../models/user');

module.exports = {
    // Has the user email been used
    isEmailUsed: function(email) {
        var result = false;
        User.findOne({ email: email}, (err, user) => {
            if(user !== null) {
                result = true;
                return true;
                console.log('email already exists!');
            }
        });
    
        return false;
    },
}