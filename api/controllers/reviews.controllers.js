var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res) {
	var hotelId = req.params.hotelId;
	
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		console.log("GET hotelId", hotelId, "reviews");
		res.status(200)
		.json(data.reviews);
	});
};

module.exports.reviewsGetOne = function(req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	
	Hotel
	.findById(hotelId)
	.select('reviews')
	.exec(function(err, data) {
		console.log("GET hotelId", hotelId, "review", reviewId);
		var review = data.reviews.id(reviewId)
		res.status(200)
		.json(review);
	});
};