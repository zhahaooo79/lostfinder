const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 註冊 API
router.post('/signup', authController.signup);

// 登入 API
router.post('/login', authController.login);

module.exports = router;
