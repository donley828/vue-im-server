const rongcloudSDK = require('rongcloud-sdk');

rongcloudSDK.init('cpj2xarlc1ofn', 'qwKS6ve1MRBvMK');
rongcloudSDK.user.getToken('xxx3210161', 'donley', 'http://files.domain.com/avatar.jpg', (err, resultText) => {
  if (err) {
    console.log(err);
  } else {
    let result = JSON.parse(resultText);
    console.log(result);
  }
})