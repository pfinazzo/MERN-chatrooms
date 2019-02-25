const router = require('express').Router();
const {cookieCheck, sessionCheck, home, login, signup, signupPage, loginPage, dashboard, logout, index} = require('./../controllers/user');
require('./../config/connection');

router.use(cookieCheck);

router.get('/', sessionCheck, home);

router.post('/signup', sessionCheck, signup);

router.get('/chats', index);

router.post('/login', sessionCheck, login);

router.get('/dashboard', dashboard);

router.get('/logout', logout);


module.exports = router;