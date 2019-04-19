var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://tanmayvij:admin123@35.196.35.2:27017/meanhotel?authSource=admin';
var _connection = null;

var open = function()
{
	MongoClient.connect(dburl,{ useNewUrlParser: true }, function(err, db) {
		if(err) {
			console.log('DB Connection error:', err);
			return;
		}
		else {
			_connection = db.db('meanhotel');
			console.log('DB Connection established:', db);
		}
	});
};

var get = function()
{
	return _connection;
}

module.exports = {
	open : open,
	get : get	
};