var express = require('express');
var router = express.Router();
var hotels = require('../controllers/hotels.controllers.js');
var reviews = require('../controllers/reviews.controllers.js');

router.route('/hotels')
	.get(hotels.hotelsGetAll);
	
router.route('/hotels/:hotelId')
	.get(hotels.hotelsGetOne);
	
router.route('/hotels/new')
	.post(hotels.hotelsAddOne);
	
router.route('/hotels/:hotelId/reviews')
	.get(reviews.reviewsGetAll);
	
router.route('/hotels/:hotelId/reviews/:reviewId')
	.get(reviews.reviewsGetOne);

module.exports = router;