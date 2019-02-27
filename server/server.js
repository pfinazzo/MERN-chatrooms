var express = require('express'),
      app = express(),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      {config} = require('dotenv'),
      {join} = require('path'),
      {urlencoded, json, static} = express;

require('./config/connection');
config();
app.use(urlencoded({extended: true}))
app.use(json());
app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: 'covfefe', // change to env var later
  resave: false,
  saveUninitialized: false,
  cookie: {expires: 6000000}
}))
app.use(static(join(__dirname, "./client/public/assets")));


app.use('/users', require('./routes/user'));
app.use('/friends', require('./routes/friendRequests'));
app.use('/chatrooms', require('./routes/chatroom'));

app.listen(3001);