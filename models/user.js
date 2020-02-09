var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var userSchema = new Schema({
    email: String,
    password: String,
    creationDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    lastLoginDate: { type: Date, default: Date.now },
  });

  // export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", userSchema);