var data = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
	
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
	
	console.log("GET", count, "Hotels' data");
	var returnData = data.slice(offset, offset+count);
	res.status(200)
	.json(returnData);
};

module.exports.hotelsGetOne = function(req, res) {
	var hotelId = req.params.hotelId; 
	var thisHotel = data[hotelId];
	console.log("GET hotelId", hotelId);
	res.status(200)
	.json(thisHotel);
};

module.exports.hotelsAddOne = function(req, res) {
	console.log("POST New Hotel");
	console.log(req.body);
	res.status(200).json(req.body);
};