var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	var maxDist = 5000;
	if(req.query.maxDist)
	{
		maxDist = (parseInt(req.query.maxDist, 10)*1000);
	}
	Hotel
		.aggregate([
			{
				$geoNear: {
					near: point,
					spherical: true,
					maxDistance: maxDist,
					num: 5,
					distanceField: "dist.calculated"
				}
			}
		]).then( function(results) {
			console.log('Geo Results', results);
			res
				.status(200)
				.json(results);
		});
};

module.exports.hotelsGetAll = function(req, res) {
	
		
	var offset = 0;
	var count = 5;
	
	if(req.query && req.query.lat && req.query.lng)
	{
		runGeoQuery(req, res);
		return;
	}
	
	if(req.query && req.query.offset)
	{
		offset = parseInt(req.query.offset, 10);
	}
	if(req.query && req.query.count)
	{
		count = parseInt(req.query.count, 10);
	}
	Hotel
		.find()
	.skip(offset)
	.limit(count)
		.exec(function(err, data) {
			console.log("GET", count, "Hotels' data");
		res.status(200)
		.json(data);
		});
	
};

module.exports.hotelsGetOne = function(req, res) {
	
	var hotelId = req.params.hotelId;
	
	Hotel.findById(hotelId, function(err, data) {
		console.log("GET hotelId", hotelId);
		res.status(200)
		.json(data);
	});
};

module.exports.hotelsAddOne = function(req, res) {
	/*var db = dbconn.get();
	var collection = db.collection('hotels');
	var newHotel;
	
	console.log("POST New Hotel");
	if(req.body && req.body.name && req.body.stars) {
		newHotel = req.body;
		newHotel.stars = parseInt(req.body.stars, 10);
		console.log(newHotel);
		collection.insertOne(newHotel, function(err, result){
			console.log(result);
			res.status(201).json(result.ops);
		});
	}
	else {
		console.log("Error 400: Required Data missing from Request Body");
		res.status(400).send("Error 400: Required Data missing from Request Body");
	}*/
};