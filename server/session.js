var session = require('express-session');

module.exports = function(app){

  app.use(session({
    key: 'user_sid',
    secret: 'covfefe', // change to env var later
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 6000000}
  }))

}