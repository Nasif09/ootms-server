const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { createLoad, myLoadRequest, requestForLoad, loadDetails, loadRequests, acceptLoadrequest, findLoad } = require('./load.controller');
const isDriver = require('../../middlewares/isDriver');


const router = express.Router();


router.post('/', isLogin , createLoad);
router.get('/userid', isLogin, myLoadRequest);  
router.get('/', isLogin, loadRequests);  
router.post('/findload', isDriver, findLoad);//find Load(nearest)
router.post('/requestfor-load',isLogin, requestForLoad);
router.post('/accept-loadReq',isLogin, acceptLoadrequest);
router.post('/loadDetails',isLogin, loadDetails) 

module.exports = router;