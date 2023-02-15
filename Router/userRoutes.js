const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { signup, login, resetpassword, updateData } = require('../Controllers/loginSignup')


router.post('/signup',signup);
router.post('/login',login);
router.post("/reset", resetpassword);
router.post('/update/:id', updateData);

module.exports = router;