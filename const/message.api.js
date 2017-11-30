const rongcloudSDK = require('rongcloud-sdk');
const db = require('../db');
rongcloudSDK.init('cpj2xarlc1ofn', 'qwKS6ve1MRBvMK');

exports.systemMessage = (form) => {
  let to = [];
  let from = form.username;
  to.push(form.toUserId)
  rongcloudSDK.message.system.publish(from, to, 'RC:TxtMsg', '{"content":"You received a friend Request"}', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
}
// exports.publish=()n