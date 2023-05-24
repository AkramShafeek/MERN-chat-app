const express = require('express');
const authenticationMiddleware = require('../middleware/auth');
const { sendMessage, getAllMessages } = require('../controllers/messageControllers');

const router = express.Router();

router.route('/').post(authenticationMiddleware, sendMessage);
router.route('/:chatId').get(authenticationMiddleware, getAllMessages);

module.exports = router;