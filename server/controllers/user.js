const User = require('./../models/User'),
      FriendRequest = require('./../models/FriendRequest');


function cookieCheck(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

function getCurrentReceivedFriendRequests(req, res){
  let receiver = req.session.user._id;
  FriendRequest.find({receiver}).then(receivedRequests => {
    res.send(receivedRequests);
  }).catch(err => {
    console.log(err);
  })
} 

function getCurrentSentFriendRequests(req, res){
  let sender = req.session.user._id;
  FriendRequest.find({ sender }).then(sentRequests => {
    res.send(sentRequests)
  }).catch(err => {
    if (err) throw err;
  })
}

function acceptFriendRequest(req, res){
  res.send('hit accept friend request', req.body.id)
}

function declineFriendRequest(){
  res.send('hit decline friend request', req.body.id);
}

// middleware function to check for logged-in users
function sessionCheck(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    let {username, email} = req.session.user;
    res.send({username, email});
  } else {
    next();
  }
};

function addFriend(req, res){
  User.findOne(req.body).then(user=> {
    FriendRequest.create({
      sender: req.session.user._id,
      receiver: user._id
    }).then(result => {
      console.log(result)
    }).catch(err => {
      if (err) throw err;
    })
  })
}


// post route for user signup
function signup(req, res) {
  User.create(req.body)
    .then(user => {
      console.log(user);
      req.session.user = user;
      let userData = {...req.session.user._doc};
      delete userData.password;
      console.log(userData);  
      res.send(userData); 
    })
    .catch(error => {
      if (error) throw error;
      res.redirect('/users/signup');
    });
};


// post route for user Login
function login(req, res) {
  let {
    username,
    password
  } = req.body;
  User.findOne({
    username
  }).exec().then(function (user) {
    if (!user) {
      res.send('login failed');
    } else {
      user.comparePassword(password, (err, match) => {
        if (!match) {
          res.send('incorrect password');
        } else {
          console.log('hit');
          req.session.user = user
          let userData = {...req.session.user._doc};
          delete userData.password;
          console.log(userData);
          res.send(userData);
        }
      })
    }
  }).catch(err => {
    if (err) throw err;
  })
};

// route for user logout
function logout(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    req.session.destroy();
    res.end();
  } else {
    res.send('route to login page');
  }
}



module.exports = {
  cookieCheck,
  sessionCheck,
  getCurrentSentFriendRequests,
  getCurrentReceivedFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  addFriend,
  login,
  signup,
  logout
}
