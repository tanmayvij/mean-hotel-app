var data = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
	console.log("GET Hotels data");
	res.status(200)
	.json(data);
};

module.exports.hotelsGetOne = function(req, res) {
	var hotelId = req.params.hotelId; 
	var thisHotel = data[hotelId];
	console.log("GET hotelId", hotelId);
	res.status(200)
	.json(thisHotel);
};