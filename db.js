const mongoose = require('mongoose');
const User = require('./models/user');
const Group = require('./models/group');

const Models = {
  User: User,
  Group: Group,
  initialized: false
}

const initialize = () => {
  Models.User.find(null, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc.length) {
      console.log('Database opens for the first time...');
    } else {
      Models.initialized = true;
    }
  })
}


mongoose.connect('mongodb://localhost/vueim', { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', function () {
  console.log('Database connection error.');
});
db.once('open', function () {
  console.log('The database has connected.')
  initialize();
});


module.exports = Models;
//upadte
// let conditions = { userId: '112' };
// let update = { $set: { name: "donglei", password: "xxx3210161" } };
// let options = { upsert: true };
// User.update(conditions, update, options, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('update ok ！');
//   }
//   db.close();
// });
