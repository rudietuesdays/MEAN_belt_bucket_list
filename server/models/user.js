console.log('loading user model...');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	name: {
		type: String,
		required: [true, 'Enter a name'],
		minlength: [3, 'username must be at least 3 characters']
	},

	items: [{type: Schema.Types.ObjectId, ref: 'Item'}],

},{timestamps:true})

mongoose.model('User', UserSchema);
