const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { createLoad, myLoadRequest, requestForLoad, loadDetails, loadRequests, acceptLoadrequest } = require('./load.controller');
const isDriver = require('../../middlewares/isDriver');


const router = express.Router();


router.post('/', isLogin , createLoad);
router.get('/userid', isLogin, myLoadRequest);  
router.get('/', isLogin, loadRequests);  
// router.get('/', isLogin, nearestLoad);  
router.post('/requestfor-load',isLogin, requestForLoad);

router.post('/accept-loadReq', acceptLoadrequest);//???not complete


router.post('/loadDetails',isLogin, loadDetails) //??? not complete

module.exports = router;