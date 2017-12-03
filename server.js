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

/**
 * Directory: localhost:3000/api/systemslist
 * Parameters: systemslist - displays all of the system rows.
 * 			   systemslist?offset=x - displays the first x rows.
 * 			   systemslist?offset=x&start=y - displays the first x rows starting at entry y.
 * The usage of the offset and start parameters can be useful if we want to have
 * pages that display certain amounts of rows per page. eg. display 10 systems
 * per page and easily navigate through different pages to calculate the offsets and starting entries.
 */
app.get('/api/systemslist', function (req, res) {
	var queryText = "SELECT * FROM system";
	if (req.query.offset != null && req.query.start == null)
		queryText += " LIMIT " + req.query.offset;
	else if (req.query.offset != null && req.query.start != null)
		queryText += " LIMIT " + (req.query.start - 1) + ", " + req.query.offset;
	connection.query(queryText, function(error, results, fields) {
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