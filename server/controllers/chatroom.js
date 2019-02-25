

function create(req, res){
  let id = req.session.user;
  console.log(id);
  res.send(req.body);
}

module.exports = {
  create
}