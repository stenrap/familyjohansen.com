/*
    Setup script for the family_johansen database.
    
    MySQL should be starting automatically on your Mac. If it isn't, try typing: mysql.server start
    
    To insert a new author:
    
      
 */

CREATE DATABASE IF NOT EXISTS family_johansen CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

DROP TABLE IF EXISTS `family_johansen`.`authors`;
DROP TABLE IF EXISTS `family_johansen`.`posts`;

CREATE TABLE `family_johansen`.`authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `token` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `username_INDEX` (`username`),
  KEY `email_INDEX` (`email`),
  KEY `token_INDEX` (`token`)
);


/* create the posts table... */


DROP PROCEDURE IF EXISTS family_johansen.verifyUser;
DELIMITER //
CREATE PROCEDURE family_johansen.verifyUser(userNm VARCHAR(50), passWd VARCHAR(255))
	BEGIN
		SET @username = userNm;
		SET @password = passWd;
		SET @userSelectVar = CONCAT('SELECT COUNT(*) AS num ',
		                             'FROM family_johansen.authors ',
		                             'WHERE username = ? AND password = ?');
		PREPARE userSelectStmt FROM @userSelectVar;
		EXECUTE userSelectStmt USING @username, @password;
		DEALLOCATE PREPARE userSelectStmt;
	END
	//
DELIMITER ;