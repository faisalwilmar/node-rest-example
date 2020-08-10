const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.users_sign_up)

router.post('/login', UserController.users_log_in)

router.delete('/:userId', checkAuth, UserController.users_delete_single)

module.exports = router;