const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middlewares/validation');

// Public routes
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);

// Protected routes
router.get('/profile', 
  authenticate,
  authController.getProfile
);

module.exports = router;