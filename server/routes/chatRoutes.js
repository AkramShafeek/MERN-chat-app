const express = require('express');
const router = express.Router();
const { fetchChat, accessChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers');
const authenticationMiddleware = require('../middleware/auth');

// get routes
router.route('/').get(authenticationMiddleware, fetchChat)

// post routes
router.route('/').post(authenticationMiddleware, accessChat);
router.route('/group').post(authenticationMiddleware, createGroupChat);

//put routes
router.route('/grouprename').put(authenticationMiddleware, renameGroup);
router.route('/groupadd').put(authenticationMiddleware, addToGroup);
router.route('/groupremove').put(authenticationMiddleware, removeFromGroup);


module.exports = router;