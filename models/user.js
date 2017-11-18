const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  token: {
    type: String,
    unique: true
  },
  portaitUri: String,
  friends: [{ userId: String, name: String }],
  group: [{ groupId: String, groupName: String }]
}, {
    strict: true
  });

let User = mongoose.model('User', userSchema);

module.exports = User;