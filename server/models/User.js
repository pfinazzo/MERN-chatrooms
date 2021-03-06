const {Schema, model} = require('mongoose'),
      bcrypt = require('bcrypt'),
      SALT_ROUNDS = 10;

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  friends: [ this, {index: {unique: true}} ],
  chatrooms: [{
    type: 'ObjectId',
    ref: "Chatroom"
  }]
})

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) throw err;
      cb(null, isMatch);
  })
};

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

module.exports = model("User", UserSchema);