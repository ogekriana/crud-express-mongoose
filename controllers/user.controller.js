const User = require('../models/user.model.js');

// create and save new user
exports.create = (req, res) => {
	// Validate request
    if(!req.body.id && !req.body.name && !req.body.tags) {
        return res.status(400).json({
            message: "User data can not be empty"
        });
    }

    // Create a User
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        tags: req.body.tags
    });

    // Save User in the database
    User.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// retrieve and eturn all users from database
exports.findAll = (req, res) => {
	User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
};

// find a single user by id
exports.findOne = (req, res) => {
	User.findOne({'id': req.params.userId})
	.then((user) => {
		if(!user){
			return res.status(404).json({
				message: `User not found with id ${req.params.userId}`
			});
		}
		res.send(user);
	}).catch((err) => {
		if(err.kind == 'ObjectId'){
			return res.status().json({
				message: `User not found with id ${req.params.userId}`
			});
		}
		return res.status(500).json({
			message: `User not found with id ${req.params.userId}`
		});
	});
};

// update a user by id
exports.update = (req, res) => {
    if(!req.body.name && !req.body.tags) {
        return res.status(400).json({
            message: "User data can not be empty"
        });
    }
    // Update User in the database
    User.updateOne({'id': req.params.userId}, {
        name: req.body.name,
        tags: req.body.tags
    })
    .then(data => {
    	if(!data){
			return res.status(404).json({
				message: `User not found with id ${req.params.userId}`
			});
		}
        res.send(data);
    }).catch(err => {
    	if(err.kind == 'ObjectId'){
			return res.status().json({
				message: `User not found with id ${req.params.userId}`
			});
		}
        res.status(500).json({
            message: err.message || "Some error occurred while updating the User."
        });
    });
};

// delete a user by id
exports.delete = (req, res) => {
	User.remove({'id': req.params.userId})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while delete the User."
        });
    });
};