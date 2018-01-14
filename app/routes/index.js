'use strict';

var path = process.cwd();
var EventController = require(path + '/app/controllers/eventController.server.js');
var Yelp = require(path + '/app/controllers/yelpapi.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var eventController = new EventController();
	var yelp = new Yelp();
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		})
		.post(yelp.getResult);
    app.route('/get').get(isLoggedIn,function(req,res){
        res.json(req.user)
    })
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(function (req, res) {
            if(req.user){
                res.json(req.user);
            }
            else
			     res.json("");
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/events')
		.get(isLoggedIn, eventController.getEvents)
		.post(isLoggedIn, eventController.addEvent)
		.delete(isLoggedIn, eventController.deleteEvent);
};
