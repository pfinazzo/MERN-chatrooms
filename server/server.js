var express = require('express'),
      app = express(),
      cookieParser = require('cookie-parser'),
      {config} = require('dotenv'),
      {join} = require('path'),
      logger = require('morgan'),
      {urlencoded, json, static} = express;

require('./config/connection');
config();
app.use(logger('dev'));
app.use(urlencoded({extended: true}))
app.use(json());
app.use(cookieParser());
require('./session')(app);
app.use(static(join(__dirname, "./client/public/assets")));


app.use('/users', require('./routes/user'));
app.use('/friends', require('./routes/friendRequests'));
app.use('/chatrooms', require('./routes/chatroom'));

app.listen(3001);