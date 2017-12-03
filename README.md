# Toast Tagging
Note that the MySQL server must be running first

## Setup Database
Install the latest version of MySQL Workbench via the MySQL installer. 
Open MySQL Workbench and click "Create a new SQL Query".
Drag and drop the ./scripts/createAndImportCSV.sql file into the query editor.
Click execute query (lightning bolt icon) and it should create and load the data properly.

## Install Dependencies
```bash
npm install
```
## Start Server
```bash
node server.js
```

## Commenting and Syntax example for API Endpoints (GET request)
```javascript
/**
 * Directory: localhost:3000/api/systemslist
 * Parameters: systemslist - displays all of the system rows.
 * 	       systemslist?offset=x - displays the first x rows.
 * 	       systemslist?offset=x&start=y - displays the first x rows starting at entry y.
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
```
