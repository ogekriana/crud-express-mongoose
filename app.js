const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./routes/user.route.js')(app);
app.get('/', (req, res) => {
	res.json({'message': 'Hello world!'});
});

// app.use('/ogek', route);
app.listen(3000, () => {
	console.log("server is listening on port 3000");
});

//Set up default mongoose connection
mongoose.connect(dbConfig.url).then(() => {
		console.log("connection to db success");
	}).catch((err) => {
		console.log("error failed")
		process.exit();
	});
