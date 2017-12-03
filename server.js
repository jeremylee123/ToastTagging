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

app.use(express.static('public'))

app.get('/api/listsystems', function (req, res) {
	connection.query("SELECT * FROM system", function(error, results, fields) {
		res.send(results);
	});
});

app.listen(3000, () => console.log('http://localhost:3000/'))