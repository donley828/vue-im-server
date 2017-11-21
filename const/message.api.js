const rongcloudSDK = require('rongcloud-sdk');
const db = require('../db');
rongcloudSDK.init('cpj2xarlc1ofn', 'qwKS6ve1MRBvMK');

exports.systemMessage = (form) => {
  rongcloudSDK.message.system.publish('system', form.toUserId, 'RC:TxtMsg', '{"content":"You received a friend Request"}', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
}
// exports.publish=()n