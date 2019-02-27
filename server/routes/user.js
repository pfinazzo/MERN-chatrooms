const router = require('express').Router();
const {cookieCheck, sessionCheck, login, signup, logout} = require('./../controllers/user');

router.use(cookieCheck);

router.post('/signup', sessionCheck, signup);

router.post('/login', sessionCheck, login);

router.get('/logout', logout);


module.exports = router;