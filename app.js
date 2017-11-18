const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./db');
const resolve = file => path.resolve(__dirname, file);
//路由
const signup = require('./routes/signup');
const app = express();

app.set('port', (process.env.port || 3100));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('dist'));


app.use('/signin', signup);
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


app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
});