module.exports = (app) => {
	const users = require('../controllers/user.controller.js');	

	// Create new user
	app.post('/users', users.create);

	// Retrieve all users
	app.get('/users', users.findAll);

	// Retrieve single user
	app.get('/users/:userId', users.findOne);

	// Update a user by user id
	app.put('/users/:userId', users.update);

	// Delete a user by user id
	app.delete('/users/:userId', users.delete);
}