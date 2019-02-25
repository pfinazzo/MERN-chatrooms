const User = require('./../models/User');


function cookieCheck(req, res, next) {
  console.log(req.cookies)
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

// middleware function to check for logged-in users
function sessionCheck(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/users/dashboard');
  } else {
    next();
  }
};

// chats of current User route
function index(req, res){
  res.send(req.body);
}


function home(req, res) {
  res.send('route to login');
}


// post route for user signup
function signup(req, res) {
  User.create(req.body)
    .then(user => {
      req.session.user = user.dataValues;
      res.redirect('/users/dashboard');
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
      res.send('login failed, no user found');
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


// route for user's dashboard
function dashboard(req, res) {
  console.log(req.cookies.user_id);
  if (req.session.user && req.cookies.user_sid) {
    res.send('hit dashboard');
  } else {
    res.send('route to login page');
  }
};


// route for user logout
function logout(req, res) {
  console.log('hit logout')
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    req.session.destroy();
    res.redirect('/users');
  } else {
    res.send('route to login page');
  }
}



module.exports = {
  cookieCheck,
  sessionCheck,
  home,
  login,
  index,
  signup,
  dashboard,
  logout
}
