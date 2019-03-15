const {Schema, model} = require('mongoose');

const ChatroomSchema = new Schema({
  name: String,
  admins: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: Schema.ObjectId,
    ref: 'Message', 
  }]

  // password: String later possibility for extra security, will need admin to set
})

module.exports = model("Chatroom", ChatroomSchema);