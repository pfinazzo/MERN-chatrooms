const User = require('./../models/User');

function postLogin(req, res) {
  // look for user that matches the posted username and password
  // in a real app, this would be a db query

  console.log('hit post')
  // res.send('hit post');
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
    if (err) throw err;
    user.comparePassword(password, (err, match) => {
      if (err) throw err;
      if (match){
        const token = "t" + Math.random();
        user.token = token;
        req.session.user = user;
        console.log(req.session.user)
        return res.redirect("/users/login");
      }
    })
  })
}

function signup(req, res){
  User.create(req.body).then(result => {
    console.log(result)
  }).catch(err => {
    if (err) throw err;
  })
}

function getLogin(req, res) {
  // check for session first
  if (req.session.user) {
    const {email, username} = req.session.user;
    return res.send({email, username}); 
  }
  // then check for cookie
  else if (req.headers.cookie && req.headers.cookie.indexOf("token=") !== -1) {
    // use regex to grab cookie from headers string
    var token = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
    
    // compare cookie against db records
    User.find({token}, (err, user) => {
      if (err) throw err;
      if (user) {
        req.session.user = user;
        res.redirect("/users/login")
      } else {
            // no match, so clear cookie
        res.clearCookie("token");
        return res.end();
      }
    })
  }
  // if no session or cookie, res.end
  else {
    res.end();
  }
}

function fake(req, res) {
  res.send('hit fake');
  // only users with a session can see this route
  if (req.session.user) {
    const {email, username} = req.session.user;
    return res.send({email, username}); 
  }
  else {
    res.redirect("/users/login");
  }
}

function logout(req, res) {
  res.send("hit logout");
  // clear cookie and session
  res.clearCookie("token");
  req.session.destroy();
  res.redirect("/users/login");
}

module.exports = {
  postLogin, 
  fake, 
  logout,
  getLogin, 
  signup
}