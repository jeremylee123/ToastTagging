const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password:  'root',
  database : 'toasttagging'
});
const express = require('express');
const app = express();

app.use(express.static('../frontend/public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/api/listsystems', function (req, res) {
	connection.query("SELECT * FROM system", function(error, results, fields) {
    if(error) {
      console.log("Error connecting to db");
    }
		res.send(results);
	});
});

app.listen(3000, () => console.log('http://localhost:3000/'))
