const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'toasttagging'
});
const express = require('express');
const app = express();

// Use static resources in public folder (HTML, CSS, JS)
app.use(express.static('public'));

// Provides a list of systems that the user has access to
app.get('/api/listsystems', function (req, res) {
	connection.query("SELECT * FROM system", function(error, results, fields) {
		res.send(results);
	});
});

// Provides information about a system based off of the given serialNumber
app.get('/api/systems', function (req, res) {
	connection.query("SELECT * FROM system WHERE serialNumber = "+ req.query.serialNumber, function(error, results, fields) {
		res.send(results);
	});
});

app.listen(3000, () => console.log('http://localhost:3000/'))