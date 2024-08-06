const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post('/image/upload',authController.upload)
router.post('/image/upload1',authController.upload1)
module.exports = router;