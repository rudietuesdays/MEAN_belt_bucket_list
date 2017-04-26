console.log('loading items controller...');
var mongoose = require('mongoose');
var Item = mongoose.model('Item')
var User = mongoose.model('User')

module.exports = {
  index: function(req, res){
    console.log('in item index fx');
    Item.find({$or: [{_user: req.params.id}, {_friend: req.params.id}]})
    .populate('_user')
    .populate('_friend')
    .exec(function(err, items){
      if(err){console.log(err);}
      res.json({items});
    });
  },

  create: function(req, res) {
    console.log('in item create fx');

    var item = new Item({
      _user: req.params.id,
      _friend: req.body._friend,
      title: req.body.title,
      description: req.body.description,
    });
    item.save(
      (err, item) => {
        if(err){
          console.log(err);
          res.json(err);
        }
        else {
          console.log('item created');
          res.json(item);
        }
      }
    )
  },

  update: function(req, res){
    console.log('in update item fx');
    Item.findOne({_id: req.params.id}, function(err, item){
      if (err) { console.log(err); }
      if (item.checked == true){
        item.checked = false;
      } else if (item.checked == false) {
        item.checked = true;
      }
      item.save(function(err, item){
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log('item updated');
          res.json(item);
        }
      })
    })
  }

}
