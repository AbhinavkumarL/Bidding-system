CREATE DATABASE  IF NOT EXISTS `biddingSystem` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `biddingSystem`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: biddingSystem
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BIDS`
--

DROP TABLE IF EXISTS `BIDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BIDS` (
  `bid_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `item_id` int(10) NOT NULL,
  `bid_amount` decimal(6,2) NOT NULL,
  `Rec_mtn_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bid_id`),
  KEY `FK_userId_bids` (`user_id`),
  KEY `FK_itemid_bid` (`item_id`),
  CONSTRAINT `FK_itemid_bid` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `FK_userId_bids` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BIDS`
--

LOCK TABLES `BIDS` WRITE;
/*!40000 ALTER TABLE `BIDS` DISABLE KEYS */;
INSERT INTO `BIDS` VALUES (1,3,1,450.00,'2017-04-14 15:20:59'),(2,3,4,350.00,'2017-04-18 13:50:24'),(3,3,4,350.00,'2017-04-18 13:52:38'),(4,4,4,400.00,'2017-04-18 13:53:08'),(5,1,4,450.00,'2017-04-18 13:53:27');
/*!40000 ALTER TABLE `BIDS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SESSIONS`
--

DROP TABLE IF EXISTS `SESSIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SESSIONS` (
  `sesskey` int(10) NOT NULL AUTO_INCREMENT,
  `expiry` int(11) NOT NULL DEFAULT '1000000',
  `value` mediumtext,
  `isuser` int(1) NOT NULL DEFAULT '1',
  `isadmin` int(1) NOT NULL DEFAULT '0',
  `browser` varchar(50) NOT NULL DEFAULT 'Google Chrome',
  `sesskeyapi` varchar(250) NOT NULL,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`sesskey`),
  KEY `FK_USERID` (`user_id`),
  CONSTRAINT `FK_USERID` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SESSIONS`
--

LOCK TABLES `SESSIONS` WRITE;
/*!40000 ALTER TABLE `SESSIONS` DISABLE KEYS */;
/*!40000 ALTER TABLE `SESSIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `item_id` int(10) NOT NULL AUTO_INCREMENT,
  `item_desc` varchar(500) NOT NULL,
  `user_id` int(10) NOT NULL,
  `init_bid` decimal(6,2) NOT NULL,
  `shelf_time` int(10) DEFAULT NULL,
  `Rec_mtn_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('available','soldout') NOT NULL DEFAULT 'available',
  PRIMARY KEY (`item_id`),
  KEY `FK_userid_items` (`user_id`),
  CONSTRAINT `FK_userid_items` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Iphone 6s',2,400.00,1200,'2017-04-14 13:35:00','available'),(2,'Iphone 7',2,500.00,120000,'2017-04-14 13:37:14','available'),(3,'Samsung galaxy s8',2,300.00,100000,'2017-04-14 13:40:21','available'),(4,'Microwave 5000W portable',5,300.00,10000000,'2017-04-18 13:47:26','soldout');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `trans_id` int(10) NOT NULL AUTO_INCREMENT,
  `bid_id` int(10) NOT NULL,
  `trans_value` decimal(6,2) NOT NULL,
  `Rec_mtn_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_id` int(10) NOT NULL,
  PRIMARY KEY (`trans_id`),
  KEY `FK_bidid_trans` (`bid_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `FK_bidid_trans` FOREIGN KEY (`bid_id`) REFERENCES `bids` (`bid_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,450.00,'2017-04-14 16:23:36',1),(2,1,450.00,'2017-04-14 16:23:50',1),(3,1,450.00,'2017-04-14 16:25:43',1),(4,5,450.00,'2017-04-18 16:53:15',4),(5,5,450.00,'2017-04-18 16:53:46',4),(6,5,450.00,'2017-04-18 16:58:23',4),(7,5,450.00,'2017-04-18 16:59:06',4),(8,5,450.00,'2017-04-18 17:03:03',4),(9,5,450.00,'2017-04-18 17:03:58',4),(10,5,450.00,'2017-04-18 17:06:28',4),(11,5,450.00,'2017-04-18 17:07:05',4),(12,5,450.00,'2017-04-18 17:08:07',4),(13,5,450.00,'2017-04-18 17:08:40',4),(14,5,450.00,'2017-04-18 17:10:43',4),(15,5,450.00,'2017-04-18 17:12:49',4),(16,5,450.00,'2017-04-18 17:19:05',4),(17,5,450.00,'2017-04-18 17:19:46',4),(18,5,450.00,'2017-04-18 17:21:37',4),(19,5,450.00,'2017-04-18 17:22:44',4),(20,5,450.00,'2017-04-18 17:24:26',4),(21,5,450.00,'2017-04-18 17:25:26',4),(22,5,450.00,'2017-04-18 17:26:03',4),(23,5,450.00,'2017-04-18 17:27:56',4),(24,5,450.00,'2017-04-18 17:31:18',4),(25,5,450.00,'2017-04-18 17:34:38',4),(26,5,450.00,'2017-04-18 17:38:29',4),(27,5,450.00,'2017-04-18 17:39:32',4),(28,5,450.00,'2017-04-18 17:47:51',4),(29,5,450.00,'2017-04-18 17:48:38',4),(30,5,450.00,'2017-04-18 17:49:18',4),(31,5,450.00,'2017-04-18 17:49:24',4),(32,5,450.00,'2017-04-18 17:50:32',4),(33,5,450.00,'2017-04-18 17:50:46',4),(34,5,450.00,'2017-04-18 17:51:32',4),(35,5,450.00,'2017-04-18 17:51:32',4),(36,5,450.00,'2017-04-18 17:51:50',4),(37,5,450.00,'2017-04-18 17:52:30',4),(38,5,450.00,'2017-04-18 17:52:49',4),(39,5,450.00,'2017-04-18 17:53:27',4),(40,5,450.00,'2017-04-18 17:54:02',4),(41,5,450.00,'2017-04-18 17:54:17',4),(42,5,450.00,'2017-04-18 17:54:45',4),(43,5,450.00,'2017-04-18 17:54:59',4),(44,5,450.00,'2017-04-18 17:55:38',4),(45,5,450.00,'2017-04-18 17:55:55',4),(46,5,450.00,'2017-04-18 18:54:22',4),(47,5,450.00,'2017-04-18 18:55:17',4),(48,5,450.00,'2017-04-18 18:58:18',4);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `password` varchar(32) NOT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','suspended') NOT NULL DEFAULT 'suspended',
  `lastseen` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `login_location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'226723fabf858fa7415e71e920b9a4e2','219c1d80-2019-11e7-9a2a-39728aa595a6','abhi.4125@gmail.com','Abhinav','Labhishetty','2017-04-13 02:16:36','suspended','2017-04-18 17:17:37','Dallas, TX, USA'),(2,'3e69140213cc19eed2f22ba64d6c0000','381ff390-2075-11e7-86a5-b91a2aab553d','abhinav@gmail.com','Abhinav','Labhishetty','2017-04-13 13:15:48','suspended','2017-04-18 12:30:01','Dallas, TX, USA'),(3,'c1bb8af4bffaf3a28595473fd1d43808','2d83c690-2076-11e7-aece-f9d5fd4edde6','abhi@gmail.com','Abhinav','Labhishetty','2017-04-13 13:22:39','suspended','2017-04-13 13:22:39','Dallas, TX, USA'),(4,'359bb7965c9a61f31a155302b3b7fb69','82e8ad30-23e1-11e7-b36c-9f64b27df240','bkanvesh22@gmail.com','Anvesh','Samineni','2017-04-17 21:48:32','suspended','2017-04-18 12:30:01',NULL),(5,'a1a5b420c86cc43275a1864c39394cae','31052aa0-23e3-11e7-acc5-0f42ae179766','abhi.4125@gmail.com','Rammurthy','Mudimadugula','2017-04-17 22:00:34','suspended','2017-04-18 17:02:19',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-18 18:59:50
