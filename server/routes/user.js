const router = require('express').Router();
const {postLogin, fake, logout, getLogin, signup} = require('./../controllers/user');
require('./../config/connection');

router.post("/login", postLogin);

router.get("/login", getLogin);

router.get("/fake", fake);

router.get("/logout", logout);

router.post("/signup", signup);


module.exports = router;