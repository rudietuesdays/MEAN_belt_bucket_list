var users = require('../controllers/users.js')
var items = require('../controllers/items.js')

module.exports = function(app){
	// user routes
	app.post('/login', users.create);
	app.get('/users', users.index);
	app.get('/users/:id', users.show);

	// item routes
	app.post('/:id/items', items.create);
	app.get('/:id/items', items.index);
	app.put('/items/:id', items.update);
}
