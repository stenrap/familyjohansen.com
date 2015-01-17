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

CREATE TABLE `family_johansen`.`posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `featured` varchar(255) DEFAULT NULL,
  `video` tinyint(4) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `normalized_title` varchar(255) NOT NULL,
  `post_date` date NOT NULL,
  `author` int(10) unsigned NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `body` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_fk_idx` (`author`) USING BTREE,
  KEY `title_idx` (`normalized_title`),
  KEY `tag_idx` (`tags`),
  KEY `date_idx` (`post_date`),
  CONSTRAINT `author_fk` FOREIGN KEY (`author`) REFERENCES `authors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
);


/* WYLO .... You'll want a single db-service (not separate login- and post- services). */


DROP PROCEDURE IF EXISTS family_johansen.getUser;
DELIMITER //
CREATE PROCEDURE family_johansen.getUser(userNm VARCHAR(50))
	BEGIN
		SET @username = userNm;
		SET @userSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.authors ',
		                            'WHERE username = ?');
		PREPARE userSelectStmt FROM @userSelectVar;
		EXECUTE userSelectStmt USING @username;
		DEALLOCATE PREPARE userSelectStmt;
	END
	//
DELIMITER ;
