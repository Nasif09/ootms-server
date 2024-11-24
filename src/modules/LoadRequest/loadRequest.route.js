const express = require('express');
const isDriver = require('../../middlewares/isDriver');
const { findLoad, requestLoad } = require('./loadRequest.controller');


const router = express.Router();

router.post('/findload', isDriver, findLoad); //move to load
router.post('/', isDriver, requestLoad); 


module.exports = router;