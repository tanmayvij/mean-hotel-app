var express = require('express');
var router = express.Router();
var hotels = require('../controllers/hotels.controllers.js');

router.route('/hotels')
	.get(hotels.hotelsGetAll);
	
router.route('/hotels/:hotelId')
	.get(hotels.hotelsGetOne);

module.exports = router;