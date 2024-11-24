const express = require('express');
const isDriver = require('../../middlewares/isDriver');
const { addtransport, findTransportInfo } = require('./transport.controller');


const router = express.Router();


router.post('/', isDriver, addtransport);
router.post('/transportInfo', isDriver, findTransportInfo); 
// router.post('/transportInfo', isDriver, findTransportInfo); 


module.exports = router;