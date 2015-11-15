var UserModel = require('./models/users');

module.exports = function (app) {
	app.get('/', function (req, res) {
		UserModel.find({}, function (err, docs) {
			if (err) throw err;
			res.render('index', { list: docs });
		});
	});

	app.get('/login', function (req, res) {
		res.render('login');
	});

	app.post('/login', function (req, res) {
		var schema = {
			username: req.param('username'),
			password: req.param('password')
		};
		UserModel.findOne(schema, function (err, doc) {
			var data = {};

			if (err) throw err;

			else if (doc) {
				req.session.user = doc;
				data.redirect = '/';
			} else {
				data.note = 'wrong username or password';
			}

			res.send(data);
		});
	});

	app.get('/logout', function (req, res) {
		delete req.session.user;
		res.redirect('/login');
	});

	app.post('/register', function (req, res) {
		var instance = new UserModel(),
			data = {};

		instance.username = req.param('username');
		instance.password = req.param('password');
		instance.isAdmin = false;
		
		if(instance.username == '')
			return res.send({note: 'username cannot be empty'});
		if(instance.password == '')
			return res.send({note: 'password cannot be empty'});

		instance.save(function (err) {
			if (err) {
				if (err.code === 11000)
					data.note = 'username is already taken';
				else data.note = 'sorry, something gone wrong';
			} else {
				req.session.user = instance;
				data.redirect = '/';
			}

			res.send(data);
		});
	});

	app.get('/delete/:id', function (req, res) {
		UserModel.findByIdAndRemove(req.params.id, function (err) {
			if (err) throw err;
			res.redirect('/');
		});
	});
	
	app.post('/update/:id', function(req, res) {
		UserModel.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err) {
			var data = {};
			
			if(err) {
				if(err.code === 11000)
					data.note = 'username is already taken';
				else data.note = 'sorry, something gone wrong';				
			}
			else data.success = true;
			
			res.send(data);
		});
	});
};