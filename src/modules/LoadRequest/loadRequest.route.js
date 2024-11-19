const express = require('express');

const { } = require('');


const router = express.Router();


router.get('/:id', findTransportationInfo); //fetrch Driver name & Truck Number
router.post('/', isDriver, findLoad); //isdriver to take driverid & search with filter data like: TS,PS,CL
router.get('/:id', loadDetails); // using loadID
router.post('/:id',isDriver, requestLoad); // using loadID


module.exports = router;