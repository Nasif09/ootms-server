const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { shippingHistory } = require('./shipping.controller');

const router = express.Router();


router.get('/',isLogin, shippingHistory);




module.exports = router;