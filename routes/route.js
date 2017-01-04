var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var request = require('request');
var db;

connect();

router.get('/api/read', function (req, res) {
	read('sprint_data', function (err, result) {
		var responseCode = (err) ? 204 : 200;
		res.send(responseCode, result);
	});
});

router.post('/api/write', function (req, res) {
	var formData = req.body;
	write(formData,'sprint_data', function (err, result) {
		var responseCode = (err) ? 204 : 200;
		res.send(responseCode, result);
	});
});

router.get('/admin', function (req, res, next) {
	var dashboard = 'admin';

	request('http://localhost:3030/api/read', function (error, response, body) {
	  var templateVars = {
		dashboard: 'dashboard',
		request: req,
		result: JSON.parse(body).reverse()[0]
      };
      res.render(dashboard, templateVars);
	});
});



function connect() {
	db = mongo.db('mongodb://localhost:27017/sprint_dashboard');
}

function read(table, callback) {
  	db.collection(table).find().toArray(function (err, result) {
  		callback(err, result);
	});
}

function write(items, table, callback) {
	db.collection(table).insertMany([items], function(err, result) {
    	callback(err, result);
  	});
}
module.exports = router;