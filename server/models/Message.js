const { Schema, model } = require('mongoose');

module.exports = model("Message", new Schema({
  content: String,
  username: String
}, { timestamps: true }));


