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
INSERT INTO `toasttagging`.`systemgroup` (id, name, manager)
	VALUES (1, "US Region", 2),
		   (2, "Alpha Systems", 3),
           (3, "Beta Systems", 6),
           (4, "Test Group", 4),
           (5, "Toast-tacular", 3),
		   (6, "mac operating system", 4);

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
INSERT INTO `toasttagging`.`tag` (name, id, user_id, visibility)
	VALUES ("toaster", 1, 2, 0),
		   ("canada region", 2, 4, 1),
           ("operational", 3, 6, 1),
           ("testing", 4, 3, 2),
           ("fantastic", 5, 2, 1),
		   ("mac operating system", 6, 4, 2),
           ("alpha", 7, 3, 0),
           ("beta", 8, 3, 0);

#Populates a table of users, first user having admin priviledges.
#Random assortment of passwords to test logins.
#The non hashed passwords for these users can be found in the main read me of this project
INSERT INTO `toasttagging`.`user` (user_id, admin, username, password)
	VALUES (1, 1, "admin", "$2a$10$K1.o08GE0/RSGLoh0QFWW.LrISRHBJQyNB6WbwSWqu/AP788OXUhm"),
		   (2, 0, "miles", "$2a$10$aEyN0Yt6tqQJvCfDdFfSKOx2j2Gus636Hhc8262UxrYu4sgJg6ih2"),
           (3, 0, "billymays", "$2a$10$IhCW7eZ5rQlwlO7MQItT4u9EhRGwqwiKZBdvvJknOpjcQaG6ZqA3S"),
           (4, 0, "client1", "$2a$10$Gz37yc/hZxDJM8f6t2gTneusBrbwHsO/Sw3Yy0K5JgVGLQbN/pTSe"),
           (5, 0, "client2", "$2a$10$JhSY8fy0NiQaryUkzaerc.8OpcaHL4KoWDbKkrvq/in5pvj/dCj0G"),
           (6, 0, "client3", "$2a$10$sm3k58cUeVABL/1JGhbV4etvw0BhrNmZ1ggKncvgD5gKudLuFd0wS"),
           (7, 0, "tommy.wiseau", "$2a$10$s4dLIpDf9BF8eQuYXz438uxMn7se7jW12K6s0n5LWnH9nq8pFSlga");
