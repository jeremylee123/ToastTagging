const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const headerParser = require('header-parser');
const jwt = require('jsonwebtoken');
const config = require('./files/config');
const validateJWT = require('express-jwt');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password:  'root',
  database : 'toasttagging'
});
const express = require('express');
const app = express();

app.use(express.static('../frontend/public'));
app.use(bodyParser.json());
app.use(headerParser);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use("/api/", validateJWT({
  secret: config.secret,
  getToken: function getTokenFromHeader(req) {
    return req.get('token');
  }}).unless({
    path: [
      '/api/login'
    ]
  }));
//Endpoint for authenticating user. Sends back jwt token if credentials exist
app.post('/api/login', function (req, res) {
  // Get the id, username, password from the username based off of the provided username
  connection.query("SELECT user_id, username, password FROM user WHERE username="
    + "\"" + req.body.username + "\"", function(error, results, fields) {
    if(error) {
      console.log("Error retrieving userid based off of credentials");
      console.log(error);
      res.status(500).send("Error authenticating credentials");
      return;
    }
    console.log(results[0].password);
    // Compare the password the user entered with the hash we pulled from the DB
    bcrypt.compare(req.body.password, results[0].password, function(error, bcryptResult) {
      if(error) {
        console.log("Could not hash password");
        console.log(error);
        res.status(500).send("Error authenticating credentials");
        return;
      }
      if(bcryptResult == true) {
        //Return token with user_id if credentials are correct
        res.send({token: jwt.sign({
          userid: results[0].user_id
        }, config.secret)});
      } else {
        console.log("Could not match " + req.body.password + " with " + results.passwords);
        res.status(401).send("The provided credentials are incorrect");
      }
    });
  });
});

app.get('/api/listsystems', function (req, res) {
	connection.query("SELECT * FROM system", function(error, results, fields) {
    if(error) {
      console.log("Error connecting to db");
    }
		res.send(results);
	});
});

app.listen(3000, () => console.log('http://localhost:3000/'));
