const User = require('./../models/User');
const {validToken, createToken} = require('../utilities/tokenService');


function cookieCheck({signedCookies: {token}}, res) {
  if (token) {
    validToken(token).then(({user: {_id}}) => {
      console.log(token, user)
      User.findById(_id).then(({username, email}) => {
        return res.send({ username, email });
      }).catch(err => {
        if (err) throw err;
      })
    }).catch(err => {
      if (err) throw err;
    })
  } else {
    res.send('please log back in');
  }
}

  
function signup({body}, res) {
  User.create(body).then(user => {
      let token = createToken(user);
      res.cookie('token', token, {
        httpOnly: true, // only accessible from same origin
        // secure: true, // only accessible over https, this will be commented back in for when its deployed
        maxAge: 1000 * 60 * 60, // one hour cookie age,
        signed: true 
      });
      res.redirect('/users/authorized');
  }).catch(err => {
    if (err) throw err;
  })
};


function login({body: {username, password}}, res) {
  if (username && password) {
    User.findOne({
      username
    }).exec().then(function (user) {
      if (!user) {
        res.status(400).json({err: "login failed"});
      } else {
        user.comparePassword(password, (err, match) => {
          if (!match) {
            res.status(400).json({err: "incorrect password"});
          } else {
            let token = createToken(user);
            res.cookie('token', token, {
              httpOnly: true, // only accessible from same origin
              // secure: true, // only accessible over https
              maxAge: 1000 * 60 * 60, // one hour cookie age,
              signed: true 
            });
            res.redirect("/users/authorized");
          }
        })
      }
    }).catch(err => {
      if (err) throw err;
    })
  } else {
    res.status(400).json({err: "incorrect username or password"})
  }

};

function logout(req, res) {
  res.clearCookie('token');
  res.send('successfully logged out');
}



module.exports = {
  cookieCheck,
  login,
  signup,
  logout
}