const express = require('express'),
      app = express(),
      session = require('express-session'),
      cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: "covfefe", // change to env var later
  resave: false,
  saveUninitialized: false,
  cookie: {expires: 6000000}
}))

app.use("/users", require('./routes/user'));

app.listen(3001);