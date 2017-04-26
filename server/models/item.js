console.log('loading item model...');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({

	title: {
		type: String,
		required: [true, 'Enter a title'],
    minlength: [5, 'title must be at least 5 characters long']
	},

  description: {
    type: String,
    required: [true, 'Enter a description'],
    minlength: [10, 'enter a more detailed description']
  },

  _user: {type: Schema.Types.ObjectId, ref: 'User'},

  _friend: {type: Schema.Types.ObjectId, ref: 'User'},

  checked: {
    type: Boolean,
    default: false
  }

},{timestamps:true})

mongoose.model('Item', ItemSchema);
