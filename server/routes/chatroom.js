const router = require('express').Router();
const {create} = require('./../controllers/chatroom');

router.post('/', create);

module.exports = router;