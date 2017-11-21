const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    db.User.findOne({ username }, ['token', 'password'], (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err);
                break;
            case !doc:
                res.json({ status: 0, msg: '账号不存在!' });
                break;
            case doc.password === password:
                res.json({ status: 1, msg: '登录成功!', data: { token: doc.token } });
                break;
            case doc.password !== password:
                res.json({ status: 2, msg: '密码错误!' });
                break;
            default:
                res.json({ status: 3, msg: '内部未知错误!' })
        }
    });
});
module.exports = router;