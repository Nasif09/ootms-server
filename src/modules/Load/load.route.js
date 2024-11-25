const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { createLoad, assignedLoad, assignDriver, getLoad, findLoad } = require('./load.controller');
const isDriver = require('../../middlewares/isDriver');


const router = express.Router();


router.post('/', isLogin , createLoad);
router.get('/userid', isLogin, assignedLoad);  //fetched users all assigned  using userId
router.post('/assign-driver',isLogin, assignDriver); /// not complete


router.post('/loaddetails',isDriver, findLoad) //loaddetails for driver
// router.get('/shipping-history/:id', shippingHistory);  //using userId

module.exports = router;