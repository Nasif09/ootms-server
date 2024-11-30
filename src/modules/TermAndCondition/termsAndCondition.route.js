const express = require('express');
const router = express.Router();

const isLogin = require('../../middlewares/isLogin');
const { upgradeTermsAndCondition, findTermsAndCondition } = require('./termsAndCondition.controller');

router.post('/',isLogin , upgradeTermsAndCondition);
router.get('/', findTermsAndCondition);

module.exports = router;