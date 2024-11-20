const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { addPrefferedDriver } = require('./prefferedDriver.controller');

const router = express.Router();

router.post('/',isLogin, addPrefferedDriver);


module.exports = router;