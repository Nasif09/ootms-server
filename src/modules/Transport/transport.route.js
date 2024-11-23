const express = require('express');
const isDriver = require('../../middlewares/isDriver');
const { addtransport } = require('./transport.controller');


const router = express.Router();


router.post('/', isDriver, addtransport);



module.exports = router;