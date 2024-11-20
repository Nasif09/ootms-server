const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { createLoad, assignedLoad, assignDriver } = require('./load.controller');


const router = express.Router();


router.post('/', isLogin , createLoad);
router.get('/id', isLogin, assignedLoad);  //using userId
router.post('/assign-driver',isLogin, assignDriver);

// router.get('/shipping-history/:id', shippingHistory);  //using userId

module.exports = router;