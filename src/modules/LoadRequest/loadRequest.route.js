const express = require('express');
const isDriver = require('../../middlewares/isDriver');
const { findLoad, requestLoad, loadRequestDetails } = require('./loadRequest.controller');
const isLogin = require('../../middlewares/isLogin');


const router = express.Router();

// router.post('/findload', isDriver, findLoad); //with filter
router.post('/',isLogin ,loadRequestDetails)
// router.post('/', isDriver, requestLoad); 


module.exports = router;