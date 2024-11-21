const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllermysql');
const User = require('../models/userModelmysql')
const auth = require('../middleware/authmysql'); // You'll need to create this middleware

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);

module.exports = router;