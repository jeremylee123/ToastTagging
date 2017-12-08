DROP DATABASE IF EXISTS `toasttagging`;

CREATE DATABASE `toasttagging`;

ALTER DATABASE `toasttagging` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `toasttagging`.`tag` (
  `name` VARCHAR(255) NOT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(255) NOT NULL,
  `visibility` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)) AUTO_INCREMENT = 1;

CREATE TABLE `toasttagging`.`systemgroup` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `manager` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) AUTO_INCREMENT = 1;
  
CREATE TABLE `toasttagging`.`system` (
  `companyName` VARCHAR(255) DEFAULT NULL,
  `systemName` VARCHAR(255) DEFAULT NULL,
  `serialNumber` int(12),
  `productFamily` VARCHAR(255) DEFAULT NULL,
  `model` VARCHAR(255),
  `osVersion` VARCHAR(255),
  `patches` VARCHAR(255),
  `cpgCount` VARCHAR(255) DEFAULT NULL,
  `recommended.osVersion` VARCHAR(255),
  `location.region` VARCHAR(255),
  `location.country` VARCHAR(255),
  `installDate` VARCHAR(255),
  `updated` VARCHAR(255),
  `capacity.total.freePct` VARCHAR(255) DEFAULT NULL,
  `capacity.total.freeTiB` VARCHAR(255) DEFAULT NULL,
  `capacity.total.sizeTiB` VARCHAR(255) DEFAULT NULL,
  `capacity.total.dedupeRatio` VARCHAR(255),
  `nodes.nodeCount` VARCHAR(255) DEFAULT NULL,
  `nodes.nodeCountOffline` VARCHAR(255) DEFAULT NULL,
  `disks.total.diskCount` VARCHAR(255) DEFAULT NULL,
  `disks.total.diskCountNormal` VARCHAR(255) DEFAULT NULL,
  `disks.total.diskCountDegraded` VARCHAR(255),
  `disks.total.diskCountFailed` VARCHAR(255),
  `contractStartDate` VARCHAR(255),
  `contractEndDate` VARCHAR(255),
  `batteryExpiry` VARCHAR(255),
  `sp.spVersion` VARCHAR(255),
  `vvCount` VARCHAR(255) DEFAULT NULL,
  `tpvvCount` VARCHAR(255),
  `vvCountFull` VARCHAR(255) DEFAULT NULL,
  `tdvvSizeTiB` VARCHAR(255),
  `performance.portBandwidthData.total.dataRateKBPSAvg` VARCHAR(255) DEFAULT NULL,
  `performance.portBandwidthData.total.iopsAvg` VARCHAR(255) DEFAULT NULL,
  `performance.portBandwidthData.total.iopsMax` VARCHAR(255) DEFAULT NULL,
  `performance.summary.portInfo.totalServiceTimeMillis` VARCHAR(255) DEFAULT NULL,
  `performance.summary.portInfo.readServiceTimeMillis` VARCHAR(255) DEFAULT NULL,
  `performance.summary.portInfo.writeServiceTimeMillis` VARCHAR(255) DEFAULT NULL,
  `performance.summary.delAckPct` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.readBandwidthMBPS` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.writeBandwidthMBPS` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.readServiceTimeMillis` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.writeServiceTimeMillis` VARCHAR(255),
  `nodes.cpuAvgMax` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`serialNumber`)
) CHARACTER SET utf8mb4;

LOAD DATA LOCAL INFILE 'C:/Users/Christopher/Documents/School/CS320/Tagging/ToastTagging/systems.csv'
INTO TABLE `toasttagging`.`system`
COLUMNS terminated by ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
  
CREATE TABLE `toasttagging`.`user` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC)) AUTO_INCREMENT = 1;
  
CREATE TABLE `toasttagging`.`systemtags` (
  `system_id` VARCHAR(255) NOT NULL,
  `tag_id` VARCHAR(255) NOT NULL);

CREATE TABLE `toasttagging`.`systemgroups` (
  `systemgroup_id` VARCHAR(255) NOT NULL,
  `system_id` VARCHAR(255) NOT NULL);

CREATE TABLE `toasttagging`.`systemgroupusers` (
  `systemgroup_id` VARCHAR(255) NOT NULL,
  `user_id` VARCHAR(255) NOT NULL);