var express = require('express');
var router = express.Router();
var hotels = require('../controllers/hotels.controllers.js');
var reviews = require('../controllers/reviews.controllers.js');

router.route('/hotels')
	.get(hotels.hotelsGetAll)
	.post(hotels.hotelsAddOne);
	
router.route('/hotels/:hotelId')
	.get(hotels.hotelsGetOne)
	.put(hotels.hotelsUpdate)
	.delete(hotels.hotelsDelete);
	
router.route('/hotels/:hotelId/reviews')
	.get(reviews.reviewsGetAll)
	.post(reviews.reviewsAddOne);
	
router.route('/hotels/:hotelId/reviews/:reviewId')
	.get(reviews.reviewsGetOne)
	.put(reviews.reviewsUpdate)
	.delete(reviews.reviewsDelete);

module.exports = router;