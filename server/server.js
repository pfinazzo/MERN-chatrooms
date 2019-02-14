const express = require('express'),
      app = express(),
      session = require('express-session');


app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session({
  secret: "yolo", // change to env var later
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto"}
}))

app.use("/users", require('./routes/user'));

app.listen(3001);