
--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `USERS` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `ipaddress` varchar(25) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `salt` varchar(100) NOT NULL ,
  `email` varchar(60) NOT NULL ,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
   `gender` enum('','male','female','others') NOT NULL ,
  `dob` date ,
  `address` varchar(200) NOT NULL ,
  `address2` varchar(200) DEFAULT NULL,
  `city` varchar(100) NOT NULL ,
  `state` varchar(100) NOT NULL ,
  `zip_code` varchar(10) NOT NULL ,
  `phone` varchar(20) NOT NULL ,
  `country` varchar(20) NOT NULL DEFAULT 'United States',
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','suspended','cancelled','unverified','banned','moderated') NOT NULL DEFAULT 'active',
  `lastseen` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT PK_USERID PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;


--
-- Table structure for table `sessions`
--
CREATE TABLE IF NOT EXISTS `SESSIONS` (
  `sesskey` int(10) NOT NULL AUTO_INCREMENT,
  `expiry` int(11) NOT NULL DEFAULT '1000000',
  `value` mediumtext,
  `isuser` int(1) NOT NULL  DEFAULT '1',
  `isadmin` int(1) NOT NULL DEFAULT '0',
  `browser` varchar(50) NOT NULL DEFAULT 'Google Chrome',
  `sesskeyapi` varchar(250) NOT NULL ,
  `user_id` int(10) NOT NULL,
  CONSTRAINT PK_SESSIONID PRIMARY KEY (`sesskey`),
  CONSTRAINT FK_USERID FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_general_ci;

--
-- Table structure for table `Bids`
-- 
