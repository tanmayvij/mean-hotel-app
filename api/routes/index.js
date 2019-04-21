var express = require('express');
var router = express.Router();
var hotels = require('../controllers/hotels.controllers.js');
var reviews = require('../controllers/reviews.controllers.js');
var users = require('../controllers/users.controllers.js');

router.route('/hotels')
	.get(hotels.hotelsGetAll)
	.post(users.checkAdmin, hotels.hotelsAddOne);
	
router.route('/hotels/:hotelId')
	.get(hotels.hotelsGetOne)
	.put(users.checkAdmin, hotels.hotelsUpdate)
	.delete(users.checkAdmin, hotels.hotelsDelete);
	
router.route('/hotels/:hotelId/reviews')
	.get(reviews.reviewsGetAll)
	.post(users.authenticate, reviews.reviewsAddOne);
	
router.route('/hotels/:hotelId/reviews/:reviewId')
	.get(reviews.reviewsGetOne)
	.put(users.authenticate, reviews.reviewsUpdate)
	.delete(users.authenticate, reviews.reviewsDelete);
	
router.route('/users/login')
	.post(users.login);
	
router.route('/users/register')
	.post(users.register);
	
router.route('/users/forgot')
	.post(users.forgot);

router.route('/users/resetpass')
	.get(users.resetpass);

module.exports = router;
