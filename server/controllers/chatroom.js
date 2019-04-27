const Chatroom = require('./../models/Chatroom');
const User = require('./../models/User');

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
  fillUsers(users, users => {
    fillUsers(admins, admins => {
      Chatroom.create({ name, admins, users }).then(chatroom => {
        res.send(chatroom);
      }).catch(err => {
        if (err) throw err;
      })
    })  
  }); 
}



module.exports = {
  create
}
