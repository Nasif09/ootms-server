const express = require('express');
const isDriver = require('../../middlewares/isDriver');
const { findTransportInfo } = require('./loadRequest.controller');


const router = express.Router();


router.get('/', isDriver, findTransportInfo); //fetch Driver name & Truck Number
// router.post('/', isDriver, findLoad); //isdriver to take driverid & search with filter data like: TS,PS,CL
// router.get('/:id', loadDetails); // using loadID
// router.post('/:id',isDriver, requestLoad); // using loadID


module.exports = router;