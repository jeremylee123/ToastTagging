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
 * Type: GET
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

/**
 * Type: POST
 * Directory: localhost:3000/api/tags
 * Parameters: tags?serial_id=w&name=x&user_id=y&visibility=z - Adds a tag entry to the tag table with name x, user id y, 
 * 													and visibility z. This tag is then added to system w.
 * This adds a new tag entry to the tag table of our database. The id is a primary key
 * and will automatically increment every new entry, meaning that the id's will stay unique.
 * All three parameters are required since we don't want nulled data, web page will respond if
 * the syntax is incorrect. This also adds the tag to the junction table corresponding to the system id.
 */
app.post('/api/tags', function (req, res) {
	var serial_id = req.query.serial_id;
	var name = req.query.name;
	var user_id = req.query.user_id;
	var visibility = req.query.visibility;
	if (name != null && user_id != null && visibility != null) {
		connection.query("INSERT INTO tag (name, user_id, visibility) VALUES ('" + name + "', " + user_id + ", " + visibility + ")"
				+ "INSERT INTO systemtags (system_id, tag_id) VALUES ('" + serial_id + "', '(SELECT id FROM tag ORDER BY ID DESC LIMIT 1)')", function(error, results, fields) {
			res.send("Successfully added the tag to the database!");
		});
	} else {
		res.send("Invalid syntax, missing correct parameters.");
	}
});

app.post('/api/groups/:groupID/addSystem/:serialNumber', function (req, res)) {
	var groupID = req.query.groupID;
	var serialNum = req.query.serialNumber;
}

app.post('/api/tags', function (req, res) {
    var serial_id = req.query.serial_id;
    var name = req.query.name;
    var user_id = req.query.user_id;
    var visibility = req.query.visibility;
    if (name != null && user_id != null && visibility != null) {
        connection.query("INSERT INTO tag (name, user_id, visibility) VALUES ('" + name + "', " + user_id + ", " + visibility + ")", function(error, results, fields) {
        });
        connection.query("INSERT INTO systemtags (system_id, tag_id) VALUES ('" + serial_id + "', '(SELECT id FROM tag ORDER BY ID DESC LIMIT 1)')", function(error, results, fields) {
            res.send("Successfully added the tag to the database!");
        });
    } else {
        res.send("Invalid syntax, missing correct parameters.");
    }
});
// Provides information about a system based off of the given serialNumber
app.get('/api/systems', function (req, res) {
	connection.query("SELECT * FROM system WHERE serialNumber = "+ req.query.serialNumber, function(error, results, fields) {
		res.send(results);
	});
});

app.listen(3000, () => console.log('http://localhost:3000/'))
