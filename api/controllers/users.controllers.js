var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const jwtkey = 's3cr3tK3y';

module.exports.register = function(req, res) {
	console.log("New User Registration");
	var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var newUser = {
		level : 1,
		userid : req.body.userid,
		name : req.body.name,
		email : req.body.email,
		phone : req.body.phone,
		password : password
	};
	
	User
	.create(newUser, function(err, data) {
		if(err) {
			console.log(err);
			res
			.status(500)
			.json(err);
		}
		else {
			console.log(data);
			res
			.status(201)
			.json(data);
		}
	});
};

module.exports.login = function(req, res) {
	var userid = req.body.userid;
	var password = req.body.password;
	
	console.log("User Login", userid);
	
	User
	.findOne({
		userid : userid
	})
	.exec(function(err, user) {
		if(err) // Server error
		{
			console.log(err);
			res
			.status(500)
			.json(err);
		}
		else if (!user) // User doesn't exist
		{
			console.log('Login failed');
			res.status(404).json({'error' : 'user does not exist'});
			
		}
		else // User found
		{
			if(bcrypt.compareSync(password, user.password))
			{
				var payload = {
					userid : userid,
					level: user.level
				};
				var token = jwt.sign(payload, jwtkey, { expiresIn : 3600*24 })
				res.status(200).json({
					'success' : true,
					'token' : token
				});
			}
			else
			{
				console.log('Login failed');
				res.status(401).json({'error' : 'auth failed'});
			}
		}
	});
};

module.exports.authenticate = function(req, res, next) {
	var headerExists = req.headers.authorization;
	if(headerExists)
	{
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, jwtkey, function(err, decoded){
			if(err)
			{
				console.log(err);
				res.status(401).json({'error' : 'auth failed'});
			}
			else
			{
				req.userid = decoded.userid;
				req.level = decoded.level;
				next();
			}
		});
	}
	else
	{
		console.log('No token provided');
		res.status(401).json({'error' : 'no token provided'});
	}
};

module.exports.checkAdmin = function(req, res, next) {
	var headerExists = req.headers.authorization;
	if(headerExists)
	{
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, jwtkey, function(err, decoded){
			if(err)
			{
				console.log(err);
				res.status(401).json({'error' : 'auth failed'});
			}
			else
			{
				if(decoded.level == 5)
				{
					next();
				}
				else
				{
					res.status(403).json({'error' : 'admin privileges required'});
				}
			}
		});
	}
	else
	{
		console.log('No token provided');
		res.status(401).json({'error' : 'no token provided'});
	}
};
