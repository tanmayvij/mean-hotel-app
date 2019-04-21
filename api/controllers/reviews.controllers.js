var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res) {
	var hotelId = req.params.hotelId;
	var returnData, statusCode;
	
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		if(err)	{
			returnData = err;
			statusCode = 500;
		}
		else {
			if(!data)
			{
				returnData = { "error": "Hotel doesn't exist" };
				statusCode = 404;
			}
			else {
				console.log("GET hotelId", hotelId, "reviews");
				statusCode  = 200;
				returnData = data.reviews;
			}
		}
		res
		.status(statusCode)
		.json(returnData);
	});
};

module.exports.reviewsGetOne = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var returnData, statusCode;
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		if(err)	{
			returnData = err;
			statusCode = 500;
		}
		else {
			if(!data)
			{
				returnData = { "error": "Hotel doesn't exist" };
				statusCode = 404;
			}
			else {
				console.log("GET hotelId", hotelId, "review", reviewId);
				var review = data.reviews.id(reviewId)
				if(!review)
				{
					returnData = { 'error': 'Review not found'}
					statusCode = 404;
				}
				else {
					returnData = review;
					statusCode = 200;
				}
			}
		}
		res
		.status(statusCode)
		.json(returnData);
	});
};

var _addReview = function(req, res, data) {
	data.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});
	data.save(function(err, hotelUpdated){
		if(err) {
			res.status(500).json(err);
		}
		else {
			res.status(201).json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
};

module.exports.reviewsAddOne = function(req, res) {
	var hotelId = req.params.hotelId;
	var statusCode, returnData;
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		if(err)	{
			returnData = err;
			statusCode = 500;
		}
		else {
			if(!data)
			{
				returnData = { "error": "Hotel doesn't exist" };
				statusCode = 404;
			}
			else {
				_addReview(req, res, data);
				return;
			}
		}
		res
		.status(statusCode)
		.json(returnData);
	});
};

module.exports.reviewsUpdate = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var returnData, statusCode;
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		if(err)	{
			returnData = err;
			statusCode = 500;
		}
		else {
			if(!data)
			{
				returnData = { "error": "Hotel doesn't exist" };
				statusCode = 404;
			}
			else {
				console.log("GET hotelId", hotelId, "review", reviewId);
				var review = data.reviews.id(reviewId)
				if(!review)
				{
					returnData = { 'error': 'Review not found'}
					statusCode = 404;
				}
				else {
					if(req.level !== 5 && req.userid !== data.name)
					{
						res.status(403).json({ 'error' : 'forbidden'});
						return;
					}
					console.log("UPDATE reviewId", reviewId);
					review.name = req.body.name;
					review.review = req.body.review;
					review.rating = parseInt(req.body.rating, 10);
					data.save(function(err, hotelUpdated){
						if(err) {
							statusCode = 500;
							returnData = err;
						}
						else {
							statusCode = 204;
							returnData = null;
							res
							.status(statusCode)
							.json(returnData);
						}
					});
					
				}
			}
		}
		if(statusCode == 404 || statusCode == 500)
		{
			res
			.status(statusCode)
			.json(returnData);
		}
	});
};

module.exports.reviewsDelete = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var returnData, statusCode;
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		if(err)	{
			returnData = err;
			statusCode = 500;
		}
		else {
			if(!data)
			{
				returnData = { "error": "Hotel doesn't exist" };
				statusCode = 404;
			}
			else {
				console.log("GET hotelId", hotelId, "review", reviewId);
				var review = data.reviews.id(reviewId)
				if(!review)
				{
					returnData = { 'error': 'Review not found'}
					statusCode = 404;
				}
				else {
					if(req.level !== 5 && req.userid !== data.name)
					{
						res.status(403).json({ 'error' : 'forbidden'});
						return;
					}
					console.log("DELETE reviewId", reviewId);
					data.reviews.id(reviewId).remove();
					data.save(function(err, hotelUpdated){
						if(err) {
							statusCode = 500;
							returnData = err;
						}
						else {
							statusCode = 204;
							returnData = null;
							res
							.status(statusCode)
							.json(returnData);
						}
					});
					
				}
			}
		}
		if(statusCode == 404 || statusCode == 500)
		{
			res
			.status(statusCode)
			.json(returnData);
		}
	});
};