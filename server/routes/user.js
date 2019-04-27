const router = require('express').Router();
const {cookieCheck, login, signup, logout} = require('./../controllers/user');

router.get('/authorized', cookieCheck);

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);


module.exports = router;