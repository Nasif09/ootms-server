const express = require('express');

const { } = require('');


const router = express.Router();


router.post('/', createLoad);
router.get('/:id', assignedLoad);  //using userId
router.post('/assign-driver', assignDriver);

router.get('/shipping-history/:id', shippingHistory);  //using userId

module.exports = router;