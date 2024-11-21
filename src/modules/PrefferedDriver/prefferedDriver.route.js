const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { addPrefferedDriver, yourPrefferedDriver, searchDriver } = require('./prefferedDriver.controller');

const router = express.Router();

router.get('/',isLogin, yourPrefferedDriver);
router.post('/',isLogin, addPrefferedDriver);

router.get('/search', searchDriver);//search driver using name,email,phone Query

module.exports = router;