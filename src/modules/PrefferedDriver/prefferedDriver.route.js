const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { addPrefferedDriver, yourPrefferedDriver } = require('./prefferedDriver.controller');

const router = express.Router();

router.post('/',isLogin, addPrefferedDriver);
router.get('/',isLogin, yourPrefferedDriver);


module.exports = router;