const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// contoh: GET /user/profile
router.get('/profile', controller.getProfile);

module.exports = router;
