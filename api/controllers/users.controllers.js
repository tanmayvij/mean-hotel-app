var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
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

module.exports.forgot = function(req, res) {
	console.log("Forgot Password request");
	
	var userid = req.body.userid;
	
	User
	.findOne({
		userid : userid
	})
	.exec(function(err, data) {
		if(err)	{
				console.log("Error getting user");
				res.status(500).json(err);
		}
		else {
			if(!data)
			{
				res.status(404).json({
					"error": "User not found"
				});
			}
			else {
				console.log("Send reset email", data.email);
				var statusCode = 200, returnData = "";
				// Generate token
				var token = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for (var i = 0; i < 32; i++)
				{
					token += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				// Update token in database
				data.token = token;
				data.save(function(err, result){
					if(err)
					{
						statusCode = 500;
						returnData = err;
					}
				});
				if(statusCode == 500) {
					res.status(statusCode).json(returnData);
					return;
				}
				// Send email
				
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.emailid,
						pass: process.env.emailpass
					}
				});
				
				var mailOptions = {
					from: 'no-reply@example.com',
					to: data.email,
					subject: 'Password reset request',
					text: 'You have requested to reset your password. Please enter the following token on the reset page: ' + token
				};
				
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
						statusCode = 500;
						returnData = err;
						res.status(statusCode).json(returnData);
					}
					else {
						console.log('Email sent: ' + info.response);
						statusCode = 200;
						returnData = { "success" : "reset link sent" };
						res.status(statusCode).json(returnData);
					}
				});
			}
		}
	});
};

module.exports.resetpass = function(req, res) {
	console.log("Password reset request");
	
	if(req.query && req.query.userid && req.query.token)
	{
		var userid = req.query.userid;
		var token = req.query.token;
	
		User
		.findOne({
			userid : userid
		})
		.exec(function(err, data) {
			if(err)	{
					console.log("Error getting user");
					res.status(500).json(err);
			}
			else {
				if(!data)
				{
					res.status(404).json({
						"error": "User not found"
					});
				}
				else {
					console.log("Reset password", userid);
					
					// Verify token
					if(token == data.token)
					{
						// Generate new password					
						var temp = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
						for (var i = 0; i < 10; i++)
						{
							temp += possible.charAt(Math.floor(Math.random() * possible.length));
						}	
						
						var password = bcrypt.hashSync(temp, bcrypt.genSaltSync(10));
						
						// Update password & remove token in database
						data.password = password;
						data.token = undefined;
						data.save(function(err, result){
							if(err)
							{
								res.status(500).json(err);
							}
							else {
								res.status(204).json();
							}
						});
					}
					else
					{
						res
						.status(401)
						.json({"error" : "invalid token"});
					}
				}
			}
		});
	}
	else
	{
		res
		.status(400)
		.json({"error" : "params missing"});
	}
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
