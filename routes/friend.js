const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/get', (req, res) => {
  const { username } = req.body;
  db.User.findOne({ username }, (err, doc) => {
    if (!!err) {
      console.log(err);
      res.json({ status: 0, msg: '服务器错误' });
    } else if (doc) {
      console.log(doc);
      res.json({ status: 1, msg: '请求成功', data: doc.friends })
    }
  });
});

module.exports = router;