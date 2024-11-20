const express = require('express');
const isDriver = require('../../middlewares/isDriver');


const router = express.Router();


router.get('/:id', isDriver, findTransportInfo); //fetch Driver name & Truck Number
router.post('/', isDriver, findLoad); //isdriver to take driverid & search with filter data like: TS,PS,CL
// router.get('/:id', loadDetails); // using loadID
// router.post('/:id',isDriver, requestLoad); // using loadID


module.exports = router;