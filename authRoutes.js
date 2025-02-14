const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');

// 회원가입 라우터
router.post('/signup', signup);

// 로그인 라우터
router.post('/login', login);

module.exports = router;
