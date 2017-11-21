const rongcloudSDK = require('rongcloud-sdk');
const db = require('../db');
rongcloudSDK.init('cpj2xarlc1ofn', 'qwKS6ve1MRBvMK');

exports.getToken = (userId, name, portraitUri) => {
  rongcloudSDK.user.getToken(userId, name, portraitUri, (err, resultText) => {
    if (err) {
      console.log(err);
    } else {
      let token = JSON.parse(resultText).token;
      let query = { username: userId };
      db.User.findOneAndUpdate(query, { token: token }, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      })
    }
  });
}
exports.checkOnline = (userId) => {
  //0 offline
  //1 online
  let state = 0;
  rongcloudSDK.user.checkOnline(userId, (err, resultText) => {
    if (err) {
      console.log(err);
    } else {
      state = resultText.status;
    }
  });
  return state;
}