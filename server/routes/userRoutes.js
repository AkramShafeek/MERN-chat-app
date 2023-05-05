const express = require('express');
const router = express.Router();
const { login, register, getAllUsers } = require('../controllers/userControllers');
const authenticationMiddleware = require('../middleware/auth');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/allUsers').get(authenticationMiddleware, getAllUsers);

module.exports = router;