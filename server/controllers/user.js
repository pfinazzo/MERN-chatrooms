const User = require('./../models/User');

function cookieCheck(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
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
  console.log('hit');
  let {
    username,
    password
  } = req.body;
  if (username && password){
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
} else {
  res.send('missing username or password');
}
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
  login,
  signup,
  logout
}
