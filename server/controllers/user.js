const User = require('./../models/User');

function postLogin(req, res) {
  // look for user that matches the posted username and password
  // in a real app, this would be a db query

  console.log('hit post')
  res.send('hit post');
  // for (var i = 0; i < users.length; i++) {
  //   if (users[i].name === req.body.username && users[i].password === req.body.password) {
  //     // create random token and "save" in fake database
  //     var token = "t" + Math.random();
  //     users[i].token = token;

  //     // also set token as a cookie that browser can read
  //     // cookie expires 999999999 milliseconds later
  //     res.cookie("token", token, {expires: new Date(Date.now() + 999999999)});

  //     // save user object on session for back-end to continue to use
  //     req.session.user = users[i];

  //     return res.redirect("/");
  //   }
  // }
}

function signup(req, res){
  User.create(req.body).then(result => {
    console.log(result);
    res.redirect("/users/login");
  }).catch(err => {
    if (err) throw err;
  })
}

function getLogin(req, res) {
  res.send("hit get login");
  // // check for session first
  // if (req.session.user) {
  //   res.send(`welcome back, ${req.session.user.name}. are you still ${req.session.user.age} years old?`);
  // }
  // // then check for cookie
  // else if (req.headers.cookie && req.headers.cookie.indexOf("token=") !== -1) {
  //   // use regex to grab cookie from headers string
  //   var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
  //   // compare cookie against db records
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].token === cookie) {  
  //       // save user object on session for back-end to continue to use
  //       req.session.user = users[i];
  
  //       return res.redirect("/users");
  //     }
  //   }

  //   // no match, so clear cookie
  //   res.clearCookie("token");
  //   res.redirect("/users");
  // }
  // // if no session or cookie, res.end
  // else {
  //   res.end()
  // }
}

function fake(req, res) {
  res.send('hit fake');
  // only users with a session can see this route
  // if (req.session.user) {
  //   res.send(`oh, it's ${req.session.user.name} again.`);
  // }
  // else {
  //   res.redirect("/users");
  // }
}

function logout(req, res) {
  res.send("hit logout");
  // clear cookie and session
  // res.clearCookie("token");
  // req.session.destroy();
  // res.redirect("/users");
}

module.exports = {
  postLogin, 
  fake, 
  logout,
  getLogin, 
  signup
}