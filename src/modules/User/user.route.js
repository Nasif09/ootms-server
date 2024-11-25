const express = require('express');

const { signUp, signIn, validateEmailSignUp, updateProfile, allUsers, getUsersById, deleteAccount, logout, forgetPassword, verifyForgetPassword, resetPassword, changePassword, completeAccount } = require('./user.controller');
const tokenVerify = require('../../middlewares/tokenVerify');
const fileUpload = require('../../middlewares/fileUpload');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const router = express.Router();


//Sign-up user
router.post('/sign-up', signUp);
router.post('/verify-email', tokenVerify, validateEmailSignUp);
router.post('/sign-in', signIn); 
router.delete('/',isLogin, logout); 
router.post('/', fileUpload, updateProfile);
router.get('/', isAdmin ,allUsers);
router.get('/id',isLogin, getUsersById);
router.delete('/', isLogin, deleteAccount);
router.post('/complete-account', isLogin, completeAccount);
router.post('/forget-password', forgetPassword);
router.post('/verify-forgetPassword', verifyForgetPassword);
router.post('/reset-password', resetPassword);

router.post('/change-password', isLogin, changePassword);  



module.exports = router;