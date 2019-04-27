const User = require('./../models/User'),
  FriendRequest = require('./../models/FriendRequest'),
  { validToken } = require('../utilities/tokenService');

function getCurrentReceivedFriendRequests({ signedCookies: { token } }, res) {
  validToken(token).then(user => {
    let receiverId = user._id;
    FriendRequest.find({
      receiverId
    }).populate('sender').then(receivedRequests => {
      receivedRequests = receivedRequests.map(request => {
        if (!request.declined) {
          let { sender: { username }, _id } = request;
          return { username, _id };
        } else {
          return { username: null, _id: null }
        }
      })
      res.send(receivedRequests);
    }).catch(err => {
      if (err) throw err;
    })
  }).catch(err => {
    if (err) throw err;
  })
}

function getCurrentSentFriendRequests({ signedCookies: { token } }, res) {
  validToken(token).then(({ _id }) => {
    let sender = _id;
    FriendRequest.find({ sender }).populate('receiver').then(sentRequests => {
      res.send(sentRequests.map(request => {
        let { receiver: { username }, _id } = request;
        return { username, _id };
      }));
    }).catch(err => {
      if (err) throw err;
    })
  })
}

function deleteFriendRequest({ signedCookies: { token }, body: { id } }, res) {
  validToken(token).then(user => {
    FriendRequest.findById(id).then(result => {
      if (result.sender === user._id) {
        result.remove();
      }
    }).catch(err => {
      if (err) throw err;
    })
  })
}

function acceptFriendRequest({ signedCookies: { token }, body: { id } }, res) {
  FriendRequest.findById(id).populate('sender').populate('receiver').then(request => {
    request.sender.friends.push(request.receiver._id);
    request.receiver.friends.push(request.sender._id);
    request.sender.save();
    request.receiver.save();
  }).catch(err => {
    if (err) throw err;
  }).finally(() => {
    FriendRequest.findByIdAndRemove(id).then(result => {
      res.send("successfully added friend!");
    }).catch(err => {
      if (err) throw err;
    })
  })
}

function getCurrentUserFriends({ signedCookies: { token } }, res) {
  validToken(token).then(({ user: { _id } }) => {
    User.findById(_id).populate('friends').then(result => {
      let usernames = [];
      result.friends.forEach(({ username }) => {
        usernames.push({ username });
      });
      res.json(usernames);
    }).catch(err => {
      if (err) throw err;
    })
  }).catch(err => {
    if (err) throw err;
  })
}

function declineFriendRequest({ body: { id } }, res) {
  FriendRequest.findByIdAndUpdate(id, {
    $set: {
      declined: true
    }
  }, {
      new: true
    }).then(result => {
      res.send(result)
    }).catch(err => {
      if (err) throw err;
    })
}

function unfriend(
  {
    signedCookies: { token },
    body: { username }
  }, res) {
  validToken(token).then(({ _id }) => {
    let friendId;
    User.findOne({ username }).then(friend => {
      friendId = friend._id;
      // remove currently logged in user id from friend's array of friend
      friend.friends = friend.friends.filter(id => id !== _id);
      console.log(friend.friends)
      friend.save();
    }).then(() => {
      User.findById(_id).then(user => {
        // remove friendid from currently logged in user's array of friends
        user.friends = user.friends.filter(id => id !== friendId);
        console.log(friend.friends);
        user.save();
        res.send(user.friends);
      });
    }).catch(err => {
      if (err) throw err;
    })
  })
}

function addFriend({ signedCookies: { token }, body }, res) {
  console.log(token);
  console.log(body);
  validToken(token).then(({ username, _id }) => {
    console.log(username)
    if (username !== body.username) {
      User.findOne(body).then(receiver => {
        FriendRequest.create({
          sender: _id,
          receiver: receiver._id
        }).then(result => {
          res.send(result)
        }).catch(err => {
          if (err) throw err;
        })
      }).catch(err => {
        if (err) throw err;
      })
    } else {
      res.send('cannot add yourself')
    }
  }).catch(err => {
    if (err) throw err;
  });
}

module.exports = {
  getCurrentSentFriendRequests,
  getCurrentReceivedFriendRequests,
  getCurrentUserFriends,
  deleteFriendRequest,
  unfriend,
  acceptFriendRequest,
  declineFriendRequest,
  addFriend,
}








