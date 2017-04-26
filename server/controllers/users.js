console.log('loading users controller...');
var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports = {
  create: function(req, res){
    console.log('in login function');
    User.findOne({name: req.body.name}, function(err, user){
      if (user) {
        console.log('user found in db: ', user);
        res.json({_id: user._id});
      } else {
        var user = new User(req.body);
        console.log('user: ', user);
        user.save(
          function(err, user){
            if (err){
              res.json(err);
            } else {res.json(user)}
          }
        )
      }
    })
  },

  show: function(req, res){
    console.log('in user show function');
    User.findOne({_id: req.params.id},
    function(err, user){
      if(err){console.log(err);}
      res.json(user);
    })
  },

  index: function(req, res) {
    User.find({})
    .exec(function(err, users){
      if(err){console.log(err);}
      res.json({users});
    });
  },

}
