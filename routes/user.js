const express = require('express');
const router = express.Router();
const db = require('../db');
const Userapi = require('../const/user.api');
const Messageapi = require('../const/message.api');

router.post('/', (req, res) => {
  const { username } = req.body;
  db.User.findOne({ username }, (err, doc) => {
    if (!!err) {
      console.log(err);
      res.json({ status: 0, msg: '服务器错误' });
    } else if (doc) {
      res.json({ status: 1, data: doc.friends })
    }
  })
});
router.post('/addUser', (req, res) => {
  let { username, to } = req.body;
  let form = { username: username, toUserId: to };
  db.User.findOne({ username: to }, (err, doc) => {
    if (!!err) {
      console.log(err);
      res.json({ status: 0, msg: '服务器错误' });
    } else {
      Messageapi.systemMessage(form);
      res.json({ status: 1, msg: '请求已发送' });
    }
  })
});
router.post('/agreeUser', (req, res) => {

});
router.post('/searchUser', (req, res) => {
  let { username } = req.body;
  let reg = "/" + username + "/";
  db.User.find({ username: eval(reg) }, (err, doc) => {
    if (!!err) {
      console.log(err);
      res.json({ status: 0, msg: '服务器错误' });
    } else if (doc) {
      res.json({ status: 1, msg: '请求成功', data: doc });
      res.end();
    }
  });
})
module.exports = router;