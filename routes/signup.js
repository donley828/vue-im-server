const express = require('express');
const router = express.Router();
const db = require('../db');
const Userapi = require('../const/user.api');

router.post('/', (req, res) => {
  const { username, name } = req.body;
  db.User.findOne({ username }, (err, doc) => {
    if (!!err) {
      console.log(err);
    } else if (!!doc) {
      res.json({ status: 1, msg: '用户名已存在!' });
    } else if (!doc) {
      new db.User(req.body).save()
        .then(() => {
          Userapi.getToken(username, name);
          res.json({ status: 2, msg: '注册成功' });
        })
        .catch((err) => console.log(err));
    } else {
      res.json({ status: 3, msg: '其他错误' });
    }
  });

});

module.exports = router;