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
