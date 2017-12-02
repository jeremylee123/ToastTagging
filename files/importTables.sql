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
  
CREATE TABLE `system` (
	`id` VARCHAR(255),
  `companyName` VARCHAR(255),
  `systemName` VARCHAR(255),
  `serialNumber` int(11) DEFAULT NULL,
  `productFamily` int(11) DEFAULT NULL,
  `model` VARCHAR(255),
  `osVersion` VARCHAR(255),
  `patches` VARCHAR(255),
  `cpgCount` int(11) DEFAULT NULL,
  `recommended.osVersion` VARCHAR(255),
  `location.region` VARCHAR(255),
  `location.country` VARCHAR(255),
  `installDate` VARCHAR(255),
  `updated` VARCHAR(255),
  `capacity.total.freePct` double DEFAULT NULL,
  `capacity.total.freeTiB` double DEFAULT NULL,
  `capacity.total.sizeTiB` double DEFAULT NULL,
  `capacity.total.dedupeRatio` VARCHAR(255),
  `nodes.nodeCount` int(11) DEFAULT NULL,
  `nodes.nodeCountOffline` int(11) DEFAULT NULL,
  `disks.total.diskCount` int(11) DEFAULT NULL,
  `disks.total.diskCountNormal` int(11) DEFAULT NULL,
  `disks.total.diskCountDegraded` VARCHAR(255),
  `disks.total.diskCountFailed` VARCHAR(255),
  `contractStartDate` VARCHAR(255),
  `contractEndDate` VARCHAR(255),
  `batteryExpiry` VARCHAR(255),
  `sp.spVersion` VARCHAR(255),
  `vvCount` int(11) DEFAULT NULL,
  `tpvvCount` VARCHAR(255),
  `vvCountFull` int(11) DEFAULT NULL,
  `tdvvSizeTiB` VARCHAR(255),
  `performance.portBandwidthData.total.dataRateKBPSAvg` double DEFAULT NULL,
  `performance.portBandwidthData.total.iopsAvg` int(11) DEFAULT NULL,
  `performance.portBandwidthData.total.iopsMax` double DEFAULT NULL,
  `performance.summary.portInfo.totalServiceTimeMillis` double DEFAULT NULL,
  `performance.summary.portInfo.readServiceTimeMillis` double DEFAULT NULL,
  `performance.summary.portInfo.writeServiceTimeMillis` double DEFAULT NULL,
  `performance.summary.delAckPct` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.readBandwidthMBPS` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.writeBandwidthMBPS` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.readServiceTimeMillis` VARCHAR(255),
  `performance.summary.vvInfo.vvsByType.ssd.writeServiceTimeMillis` VARCHAR(255),
  `nodes.cpuAvgMax` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) CHARACTER SET latin1;
  
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
