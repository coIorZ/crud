var express = require('express'),
	logger = require('morgan'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');
	

module.exports = function (app) {
	app.set('port', process.env.port || 8000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(session({secret: 'secret'}));
	app.use(express.static(__dirname + '/public'));

	app.use(function (req, res, next) {
		if (req.session && req.session.user)
			res.locals.user = req.session.user;
		next();
	});
};