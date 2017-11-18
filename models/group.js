const mongoose = require('mongoose');

let groupSchema = mongoose.Schema({
    groupId: String,
    userId: String,
    groupName: String,
    members: [{ userId: String, name: String }]
});

let Group = mongoose.model('Group', groupSchema);

module.exports = Group;