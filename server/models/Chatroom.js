const {Schema, model} = require('mongoose');

const ChatroomSchema = new Schema({
  name: String,
  admins: [{
    type: 'ObjectId',
    ref: 'User'
  }],
  users: [{
    type: 'ObjectId',
    ref: 'User'
  }]
  // password: String later possibility for extra security, will need admin to set
})

module.exports = model("Chatroom", ChatroomSchema);