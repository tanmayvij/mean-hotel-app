var express = require('express');
var app = express();
var path = require("path");

app.set('port', 8080);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test_json', function(req, res)
{
	console.log("Hello JSON");
	res.status(200)
	.json(
	{"jsonData": true}
	);
});

app.get('/', function(req, res)
{
	console.log("Hello HTML");
	res.status(200)
	.sendFile(
	path.join(__dirname, 'public', 'index.html')
	);
});

var server = app.listen(app.get('port'));

console.log(server.address());