const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./db');
const resolve = file => path.resolve(__dirname, file);
//路由
const signup = require('./routes/signup');
const signin = require('./routes/signin')
const app = express();

app.set('port', (process.env.port || 3100));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use(express.static('dist'));

//注册
app.use('/signup', signup);
//登陆
app.use('/signin', signin);
//主页
app.get('/', (req, res) => {
  let options = {
    root: __dirname + '/dist/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  let fileName = 'index.html';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent: ', fileName);
    }
  });
});
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});


app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
});