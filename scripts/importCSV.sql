LOAD DATA LOCAL INFILE 'C:/Users/miles/Downloads/systems.csv'
INTO TABLE `toasttagging`.`system`
COLUMNS terminated by ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;