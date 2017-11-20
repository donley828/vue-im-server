const querystring = require('querystring');
const http = require('http');
const crypto = require('crypto');
const hash = crypto.createHash('sha1');

const AppKey = 'cpj2xarlc1ofn';
const Nonce = Math.floor(Math.random()*10000000000);
console.log(Nonce);
const Timestamp = Date.parse(new Date());
const Signature = hash.update(AppKey + Nonce + Timestamp).digest('hex');
const postData = querystring.stringify({
  'userId': 'xxx3210161',
  'name': 'xiedonglei',
  'portraitUri': 'https://avatars1.githubusercontent.com/u/19424162?s=400&u=298843c1bade0f1b8fbfeb4222d60c9e769db4b6&v=4'
});

const options = {
  hostname: 'api.cn.ronghub.com',
  path: '/user/getToken.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'App-Key': 'cpj2xarlc1ofn',
    'Nonce': Nonce,
    'Timestamp': Timestamp,
    'Signature': Signature
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据。');
  });
});
req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
req.write(postData);
req.end();