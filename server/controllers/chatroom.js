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

function create(req, res) {
  let {
    users,
    admins,
    name
  } = req.body,
    userIds = [],
    adminIds = [];

    const someFunction = (myArray) => {
      const promises = myArray.map(async (myValue) => {
        let _id = await getUserIdFromUsername();
        userIds.push(_id)
      });
      return Promise.all(promises);
    }

    console.log(someFunction(users));
    admins.forEach(username => {
      getUserIdFromUsername(username, (id) => {
        adminIds.push(id);
      });
    })

    let payload = {
      name,
      users: userIds,
      admins: adminIds
    }

    console.log(payload);

    // let users = User.find()
    Chatroom.create(payload).then(result => {
      res.send(result);
    }).catch(err => {
      if (err) throw err;
    })

}

module.exports = {
  create
}
