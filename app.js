var express = require('express');
var app = express();
var path = require("path");
var routes = require('./api/routes');
var bodyParser = require('body-parser');
require('./api/data/dbconnection').open();

app.set('port', 8080);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended : false }));
app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
	console.log(server.address());
});
