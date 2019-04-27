const router = require('express').Router(),
      {
        getCurrentSentFriendRequests,
        getCurrentReceivedFriendRequests,
        deleteFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        getCurrentUserFriends,
        addFriend,
        unfriend
      } = require('./../controllers/friendRequests');


router.get('/', getCurrentUserFriends);

router.post('/add-friend', addFriend);

router.get('/sent-friend-requests', getCurrentSentFriendRequests);

router.put('/accept-friend-request', acceptFriendRequest);

router.post('/unfriend',  unfriend);

router.post('/delete-friend-request', deleteFriendRequest);

router.post('/decline-friend-request', declineFriendRequest);

router.get('/received-friend-requests', getCurrentReceivedFriendRequests);

module.exports = router;
