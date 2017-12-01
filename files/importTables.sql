CREATE TABLE `toasttagging`.`tag` (
  `name` VARCHAR(255) NOT NULL,
  `id` VARCHAR(255) NOT NULL,
  `user_id` VARCHAR(255) NOT NULL,
  `visibility` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

CREATE TABLE `toasttagging`.`systemgroup` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `manager` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
  
CREATE TABLE `toasttagging`.`system` (
`id` VARCHAR(255) NOT NULL,
`name` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE INDEX `id_UNIQUE` (`id` ASC));
  
CREATE TABLE `toasttagging`.`user` (
  `user_id` VARCHAR(255) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC));
  
CREATE TABLE `toasttagging`.`systemtags` (
  `system_id` VARCHAR(255) NOT NULL,
  `tag_id` VARCHAR(255) NOT NULL);

CREATE TABLE `toasttagging`.`systemgroups` (
  `systemgroup_id` VARCHAR(255) NOT NULL,
  `system_id` VARCHAR(255) NOT NULL);

CREATE TABLE `toasttagging`.`systemgroupusers` (
  `systemgroup_id` VARCHAR(255) NOT NULL,
  `user_id` VARCHAR(255) NOT NULL);
