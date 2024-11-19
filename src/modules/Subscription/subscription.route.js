const express = require('express');

const { } = require('');


const router = express.Router();

router.get('/"', allSubscription);
router.get('/:id"', mySubscription); //using userID
router.post('/"', createSubscription);


module.exports = router;