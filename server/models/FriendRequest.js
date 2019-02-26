const {Schema, model} = require('mongoose');

const FriendRequestSchema = new Schema({
  sender: {
    type: 'ObjectId',
    ref: 'User'
  },
  receiver: {
    type: 'ObjectId',
    ref: 'User'
  }
})

module.exports = model("FriendRequest", FriendRequestSchema);