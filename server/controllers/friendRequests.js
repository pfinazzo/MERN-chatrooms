const User = require('./../models/User'),
      FriendRequest = require('./../models/FriendRequest');
      
function getCurrentReceivedFriendRequests(req, res){
  if (req.session.user){
    let receiver = req.session.user._id;
    FriendRequest.find({receiver}).populate('sender').then(receivedRequests => {
      receivedRequests = receivedRequests.map(request => {
        if (!request.declined){
        let {sender} = request,
            {username} = sender,
            {_id} = request; 
            return {username, _id};         
        } else {
          return {username: null, _id: null}   
        }
      })
      res.send(receivedRequests);
    }).catch(err => {
      if (err) throw err;
  })
} else {
  res.send("not good");
}

} 

function getCurrentSentFriendRequests(req, res){
  let sender = req.session.user._id;
  FriendRequest.find({ sender }).populate('receiver').then(sentRequests => {
    sentRequests = sentRequests.map(request => {
      let {receiver} = request,
          {username} = receiver,
          {_id} = request; 
          return {username, _id};
    })
    res.send(sentRequests)
  }).catch(err => {
    if (err) throw err;
  })
}

function deleteFriendRequest(req, res){
  let {id} = req.body;
  FriendRequest.findByIdAndDelete(id).then(result => {
    res.send(result);
  }).catch(err => {
    if (err) throw err;
  })
}

function acceptFriendRequest(req, res){
  let {body} = req,
      {id} = body; // _id of current request
      FriendRequest.findById(id).populate('sender').populate('receiver').then(request => {
        request.sender.friends.push(request.receiver._id); // same thing
        request.receiver.friends.push(request.sender._id);
        request.sender.save();
        request.receiver.save();
      }).catch(err => {
        if (err) throw err;
      }).finally(() => {
        FriendRequest.findByIdAndRemove(id).then(result => {
          console.log(result);
          res.send("success");
        }).catch(err => {
          if (err) throw err;
        })
      })
}

function getCurrentUserFriends(req, res){
  if (req.session.user){
    let {_id} = req.session.user;
    User.findById(_id).populate('friends').then(result => {
      console.log(result);
      let usernames = [];
      result._doc.friends.forEach(friend => {
        usernames.push({username: friend.username});
      })
      res.json(usernames);
    }).catch(err => {
      if (err) throw err; 
    })
    } else {
    res.send("not good")
  }
}

function declineFriendRequest(req, res){
  let {id} = req.body;
  FriendRequest.findByIdAndUpdate(id, {$set: {declined: true} }, {new: true}).then(result => {
    res.send(result)
  }).catch(err => {
    if (err) throw err;
  })
}

function addFriend(req, res){
  console.log(req.session.user);
  User.findOne(req.body).then(user=> {  
    console.log(user);
    FriendRequest.create({
      sender: req.session.user._id,
      receiver: user._id
    }).then(result => {
      res.send(result)
    }).catch(err => {
      if (err) throw err;
    })
  })
}

module.exports = {
  getCurrentSentFriendRequests,
  getCurrentReceivedFriendRequests,
  getCurrentUserFriends,
  deleteFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  addFriend,
}