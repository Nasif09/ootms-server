const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const { upgradePrivacyPolicy, getPrivacyPolicy, findPrivacyPolicy } = require('./privacyPolicy.controller');
const router = express.Router();

router.post('/',isLogin, upgradePrivacyPolicy);
router.get('/', findPrivacyPolicy);

module.exports = router;