You can run the following files in MySQL Workbench by clicking the Create a new SQL Query feature. 
Just open a new tab, drag and drop the scripts into the notepad, and then click the execute button (a lightning bolt).
Please do not mess with these scripts, small changes can cause the database to function improperly.

importCSV - Imports the CSV file in the project directory into the system table. This assumes your database and tables are already set up.
setupDatabase - Drops your current database and creates the entire database and all the tables (including junctions) for toasttagging.
setupAndImportCSV - Does both of the actions in the following order: setupDatabase then importCSV.s