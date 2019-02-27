const {Schema, model} = require('mongoose');

const FriendRequestSchema = new Schema({
  sender: {
    type: 'ObjectId',
    ref: 'User',
    unique: true
  },
  receiver: {
    type: 'ObjectId',
    ref: 'User', 
    unique: true
  }
})

FriendRequestSchema.index({sender: 1, receiver: 1}, {unique: true});{}

module.exports = model("FriendRequest", FriendRequestSchema);