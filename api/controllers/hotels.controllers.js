var dbconn = require('../data/dbconnection');
var ObjectId = require('mongodb').ObjectId;

module.exports.hotelsGetAll = function(req, res) {
	
	var db = dbconn.get();
	var collection = db.collection('hotels');
	
	var offset = 0;
	var count = 5;
		
	if(req.query && req.query.offset)
	{
		offset = parseInt(req.query.offset, 10);
	}
	if(req.query && req.query.count)
	{
		count = parseInt(req.query.count, 10);
	}
	collection.find()
	.skip(offset)
	.limit(count)
	.toArray(function(err, data) {
		
		console.log("GET", count, "Hotels' data");
		res.status(200)
		.json(data);
	});
	
	
};

module.exports.hotelsGetOne = function(req, res) {
	var db = dbconn.get();
	var collection = db.collection('hotels');
	
	var hotelId = req.params.hotelId;
	
	collection.findOne({'_id': ObjectId(hotelId)}, function(err, data) {
		console.log("GET hotelId", hotelId);
		res.status(200)
		.json(data);
	});
};

module.exports.hotelsAddOne = function(req, res) {
	var db = dbconn.get();
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
	}
};