require('dotenv').config();
const express = require('express'),
      app = express(),
      cookieParser = require('cookie-parser'),
      {SECRET} = process.env,
      logger = require('morgan'),
      {urlencoded, json} = express;

require('./config/connection');

app.use(logger('dev'));
app.use(urlencoded({extended: true}))
app.use(json());
app.use(cookieParser(SECRET));
// require('./session')(app);

app.use('/users', require('./routes/user'));
app.use('/friends', require('./routes/friendRequests'));
app.use('/chatrooms', require('./routes/chatroom'));

app.listen(3001);