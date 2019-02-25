const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatrooms', {
  useNewUrlParser: true,
  useCreateIndex: true
});


