const router = require('express').Router();
const {cookieCheck, sessionCheck, login, signup, logout, addFriend, getCurrentSentFriendRequests, getCurrentReceivedFriendRequests} = require('./../controllers/user');

router.use(cookieCheck);

router.post('/add-friend', addFriend);

router.get('/sent-friend-requests', getCurrentSentFriendRequests);

router.get('/received-friend-requests', getCurrentReceivedFriendRequests);

router.post('/signup', sessionCheck, signup);

router.post('/login', sessionCheck, login);

router.get('/logout', logout);


module.exports = router;