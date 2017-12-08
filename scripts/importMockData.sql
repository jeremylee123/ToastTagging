#Empty every table in ToastTagging without deleting the structure.
TRUNCATE TABLE `toasttagging`.`system`;
TRUNCATE TABLE `toasttagging`.`systemgroup`;
TRUNCATE TABLE `toasttagging`.`systemgroups`;
TRUNCATE TABLE `toasttagging`.`systemgroupusers`;
TRUNCATE TABLE `toasttagging`.`systemtags`;
TRUNCATE TABLE `toasttagging`.`tag`;
TRUNCATE TABLE `toasttagging`.`user`;

#Populate table with the provided system CSV file.
LOAD DATA LOCAL INFILE 'C:/Users/miles/Desktop/ToastTagging/systems.csv'
INTO TABLE `toasttagging`.`system`
COLUMNS terminated by ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

#Populates a table of system groups. 
INSERT INTO `toasttagging`.`systemgroup` (name, manager)
	VALUES ("US Region", 2),
		   ("Alpha Systems", 3),
           ("Beta Systems", 6),
           ("Test Group", 4),
           ("Toast-tacular", 3),
		   ("mac operating system", 4);
           
#Populates a junction table for the systemgroup:system relation entries. 
INSERT INTO `toasttagging`.`systemgroups` (systemgroup_id, system_id)
	VALUES (1, 52),
		   (1, 43),
           (1, 28),
           (2, 4),
           (2, 72),
           (3, 64),
           (4, 51),
           (5, 43),
           (5, 128),
           (6, 420),
           (6, 360),
           (6, 101);
           
#Populates a junction table for the systemgroup:user relation entries. 
INSERT INTO `toasttagging`.`systemgroupusers` (systemgroup_id, user_id)
	VALUES (1, 1),
		   (1, 2),
		   (1, 3),
           (2, 3),
           (2, 6),
           (2, 8),
           (3, 6),
           (3, 4),
           (4, 4),
           (4, 2),
           (4, 3),
           (5, 3),
           (5, 7),
           (6, 4),
           (6, 5),
           (6, 8);

#Populates a junction table for the systemgroup:user relation entries. 
INSERT INTO `toasttagging`.`systemtags` (system_id, tag_id)
	VALUES (52, 1),
		   (52, 4),
		   (43, 2),
           (28, 3),
           (4, 4),
           (4, 6),
           (4, 8),
           (72, 7),
           (72, 8),
           (64, 5),
           (51, 2),
           (51, 6),
           (43, 5),
           (128, 1),
           (128, 3),
           (420, 2),
           (360, 5),
           (360, 6),
           (101, 1);

#Populates a table of tags, deals with a variety of visibility options. 
INSERT INTO `toasttagging`.`tag` (name, user_id, visibility)
	VALUES ("toaster", 2, 0),
		   ("canada region", 4, 1),
           ("operational", 6, 1),
           ("testing", 3, 2),
           ("fantastic", 2, 1),
		   ("mac operating system", 4, 2),
           ("alpha", 3, 0),
           ("beta", 3, 0);

#Populates a table of users, first user having admin priviledges. 
#Random assortment of passwords to test logins.
INSERT INTO `toasttagging`.`user` (admin, username, password) 
	VALUES (1, "admin", "toetagging"),
		   (0, "miles", "genericpassword"),
           (0, "billymays", "oxyclean"),
           (0, "client1", "complexpassword"),
           (0, "client2", "123654"),
           (0, "client3", "m9s0aak2MfDww3"),
           (0, "tommy.wiseau", "ohhimark"),
           (0, "redsox24", "lol12345");