const express = require('express');
const router = express.Router();
const { login, register, getAllUsers } = require('../controllers/userControllers');
const authenticationMiddleware = require('../middleware/auth');

// get routes
router.route('/').get(authenticationMiddleware, fetchChat)
router.route('/rename').get(authenticationMiddleware, renameGroup);

// post routes
router.route('/').post(authenticationMiddleware, accessChat);
router.route('/group').post(authenticationMiddleware, createGroupChat);
router.route('/groupadd').post(authenticationMiddleware, addToGroup);
router.route('/groupremove').post(authenticationMiddleware, removeFromGroup);

module.exports = router;