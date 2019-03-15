const Chatroom = require('./../models/Chatroom');
const User = require('./../models/User');

function getUserIdFromUsername(username) {
  User.findOne({
    username
  }).then(res => {
   res;
    let {
      _id
    } = res;
    return _id;
  }).catch(err => {
    if (err) throw err;
  })
}

function fillUsers(users, cb){
  let userIds = [];
  users.forEach(username => {
    User.findOne({username}).then(user => {
      console.log(user);
      userIds.push(user._id);
      cb(userIds);
    })
  })
}

function create(req, res) {
  let {
    users,
    admins,
    name
  } = req.body;
  console.log(req.body);
  var userIds = null,
      adminIds = null;

  fillUsers(users, users => {
    userIds = users;
    fillUsers(admins, admins => {
      adminIds = admins;
      let payload = {
        name, admins, users
      };
      Chatroom.create(payload).then(chatroom => {
        console.log(chatroom);
      }).catch(err => {
        if (err) throw err;
      })
    })
  });




}

module.exports = {
  create
}
