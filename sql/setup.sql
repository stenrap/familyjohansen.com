/*
    Setup script for the family_johansen database.
    
    MySQL should be starting automatically on your Mac. If it isn't, try typing: sudo mysql.server start

    To login from a command prompt:

      mysql -u root -D family_johansen -p

    To execute this very setup.sql file:

      mysql -u root -p < sql/setup.sql

    To insert a new author, create a bcrypt-hashed password using 'password-hasher.js', then plug it into 'createUser.sql'
 */

CREATE DATABASE IF NOT EXISTS family_johansen CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

USE family_johansen;

DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `authors`;

CREATE TABLE `authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `token` varchar(36) DEFAULT NULL,
  `reset_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `username_INDEX` (`username`),
  KEY `email_INDEX` (`email`),
  KEY `token_INDEX` (`token`),
  KEY `reset_INDEX` (`reset_date`)
);


CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `featured` varchar(255) DEFAULT NULL,
  `video` tinyint(4) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `normalized_title` varchar(255) NOT NULL,
  `post_date` date NOT NULL,
  `author` int(10) unsigned NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `body` text NOT NULL,
  `published` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `author_fk_idx` (`author`) USING BTREE,
  KEY `title_idx` (`normalized_title`),
  KEY `tag_idx` (`tags`),
  KEY `date_idx` (`post_date`),
  KEY `published_idx` (`published`),
  CONSTRAINT `author_fk` FOREIGN KEY (`author`) REFERENCES `authors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
);


/* Stored Procedures */

/* getUser() */

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

/* resetToken() */

DROP PROCEDURE IF EXISTS family_johansen.resetToken;
DELIMITER //
CREATE PROCEDURE family_johansen.resetToken(em VARCHAR(50))
	BEGIN
		START TRANSACTION;
			SET @authorId = NULL;
			SET @uuid = NULL;
			SET @email = em;
			SET @authorLookupVar = CONCAT('SELECT id ',
			                              'INTO @authorId ',
			                              'FROM family_johansen.authors ',
			                              'WHERE LOWER(email) = LOWER(?)');
			PREPARE authorLookupStmt FROM @authorLookupVar;
			EXECUTE authorLookupStmt USING @email;
			DEALLOCATE PREPARE authorLookupStmt;

			IF @authorId IS NOT NULL THEN
			  SET @uuid = UUID();
				SET @authorUpdateVar = CONCAT('UPDATE family_johansen.authors ',
				                              'SET token = ?, reset_date = CURDATE() ',
				                              'WHERE id = ?');
				PREPARE authorUpdateStmt FROM @authorUpdateVar;
				EXECUTE authorUpdateStmt USING @uuid, @authorId;
				DEALLOCATE PREPARE authorUpdateStmt;
			END IF;
		COMMIT;
		IF @uuid IS NOT NULL THEN
		  SELECT @uuid AS token;
		END IF;
	END
	//
DELIMITER ;

/* verifyToken() */

DROP PROCEDURE IF EXISTS family_johansen.verifyToken;
DELIMITER //
CREATE PROCEDURE family_johansen.verifyToken(tok VARCHAR(36))
	BEGIN
	    SET @token = tok;
			SET @resetDate = NULL;
			SET @valid = FALSE;
			SET @resetDateLookupVar = CONCAT('SELECT reset_date ',
			                                 'INTO @resetDate ',
			                                 'FROM family_johansen.authors ',
			                                 'WHERE LOWER(token) = LOWER(?)');
			PREPARE resetDateLookupStmt FROM @resetDateLookupVar;
			EXECUTE resetDateLookupStmt USING @token;
			DEALLOCATE PREPARE resetDateLookupStmt;

			IF @resetDate IS NOT NULL AND @resetDate <= @resetDate + INTERVAL 2 DAY THEN
				SET @valid = TRUE;
			END IF;
		SELECT @valid AS valid;
	END
	//
DELIMITER ;

/* resetPassword() */

DROP PROCEDURE IF EXISTS family_johansen.resetPassword;
DELIMITER //
CREATE PROCEDURE family_johansen.resetPassword(pass VARCHAR(255),
                                               tok VARCHAR(36))
	BEGIN
    SET @password = pass;
    SET @token = tok;
    SET @success = FALSE;
    SET @rowCount = 0;

    IF @token IS NOT NULL THEN
      SET @passwordUpdateVar = CONCAT('UPDATE family_johansen.authors ',
                                      'SET password = ?, token = NULL, reset_date = NULL ',
                                      'WHERE token  = ? ',
                                      'LIMIT 1');
      PREPARE passwordUpdateStmt FROM @passwordUpdateVar;
      EXECUTE passwordUpdateStmt USING @password, @token;
      SELECT ROW_COUNT() INTO @rowCount;
      DEALLOCATE PREPARE passwordUpdateStmt;

      IF @rowCount = 1 THEN
        SET @success = TRUE;
      END IF;
    END IF;

    SELECT @success as success;

	END
	//
DELIMITER ;

/* getUserById() */

DROP PROCEDURE IF EXISTS family_johansen.getUserById;
DELIMITER //
CREATE PROCEDURE family_johansen.getUserById(uid INT)
	BEGIN
		SET @userId = uid;
		SET @userSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.authors ',
		                            'WHERE id = ?');
		PREPARE userSelectStmt FROM @userSelectVar;
		EXECUTE userSelectStmt USING @userId;
		DEALLOCATE PREPARE userSelectStmt;
	END
	//
DELIMITER ;

/* createPost() */

DROP PROCEDURE IF EXISTS family_johansen.createPost;
DELIMITER //
CREATE PROCEDURE family_johansen.createPost(featured VARCHAR(255),
                                            video TINYINT,
                                            title VARCHAR(255),
                                            normed VARCHAR(255),
                                            postDate DATE,
                                            author INT,
                                            tags VARCHAR(255),
                                            body TEXT,
                                            published TINYINT)
	BEGIN
		SET @featured = featured;
		SET @video = video;
		SET @title = title;
		SET @normed = normed;
		SET @postDate = postDate;
		SET @author = author;
		SET @tags = tags;
		SET @body = body;
		SET @published = published;
		SET @postInsertVar = CONCAT('INSERT INTO family_johansen.posts ',
		                            'VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		PREPARE postInsertStmt FROM @postInsertVar;
		EXECUTE postInsertStmt USING @featured, @video, @title, @normed, @postDate, @author, @tags, @body, @published;
		SELECT LAST_INSERT_ID() AS id;
		DEALLOCATE PREPARE postInsertStmt;
	END
	//
DELIMITER ;

/* getSinglePost() */

DROP PROCEDURE IF EXISTS family_johansen.getSinglePost;
DELIMITER //
CREATE PROCEDURE family_johansen.getSinglePost(title VARCHAR(255))
	BEGIN
		SET @title = title;
		SET @postSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.posts ',
		                            'WHERE normalized_title = ?');
		PREPARE postSelectStmt FROM @postSelectVar;
		EXECUTE postSelectStmt USING @title;
		DEALLOCATE PREPARE postSelectStmt;
	END
	//
DELIMITER ;

/* getPostsByDate() */

DROP PROCEDURE IF EXISTS family_johansen.getPostsByDate;
DELIMITER //
CREATE PROCEDURE family_johansen.getPostsByDate(offset INT) /* zero-based offset */
	BEGIN
		SET @offset = offset * 10;
		SET @postSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.posts ',
		                            'ORDER BY post_date DESC ',
		                            'LIMIT ?, 10');
		PREPARE postSelectStmt FROM @postSelectVar;
		EXECUTE postSelectStmt USING @offset;
		DEALLOCATE PREPARE postSelectStmt;
	END
	//
DELIMITER ;

/* getPostsByAuthor() */

DROP PROCEDURE IF EXISTS family_johansen.getPostsByAuthor;
DELIMITER //
CREATE PROCEDURE family_johansen.getPostsByAuthor(authorId INT, offset INT) /* zero-based offset */
	BEGIN
		SET @authorId = authorId;
		SET @offset = offset * 10;
		SET @postSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.posts ',
		                            'WHERE author = ? ',
		                            'ORDER BY post_date DESC ',
		                            'LIMIT ?, 10');
		PREPARE postSelectStmt FROM @postSelectVar;
		EXECUTE postSelectStmt USING @authorId, @offset;
		DEALLOCATE PREPARE postSelectStmt;
	END
	//
DELIMITER ;

/* getPostsByTag() */

DROP PROCEDURE IF EXISTS family_johansen.getPostsByTag;
DELIMITER //
CREATE PROCEDURE family_johansen.getPostsByTag(tag VARCHAR(255), offset INT) /* zero-based offset */
	BEGIN
		SET @tag = CONCAT('%', tag, '%');
		SET @offset = offset * 10;
		SET @postSelectVar = CONCAT('SELECT * ',
		                            'FROM family_johansen.posts ',
		                            'WHERE tags LIKE ? ',
		                            'ORDER BY post_date DESC ',
		                            'LIMIT ?, 10');
		PREPARE postSelectStmt FROM @postSelectVar;
		EXECUTE postSelectStmt USING @tag, @offset;
		DEALLOCATE PREPARE postSelectStmt;
	END
	//
DELIMITER ;

/* updatePost() */

DROP PROCEDURE IF EXISTS family_johansen.updatePost;
DELIMITER //
CREATE PROCEDURE family_johansen.updatePost(id INT,
                                            featured VARCHAR(255),
                                            video TINYINT,
                                            title VARCHAR(255),
                                            normed VARCHAR(255),
                                            postDate DATE,
                                            author INT,
                                            tags VARCHAR(255),
                                            body TEXT,
                                            published TINYINT)
	BEGIN
		SET @id = id;
		SET @featured = featured;
		SET @video = video;
		SET @title = title;
		SET @normed = normed;
		SET @postDate = postDate;
		SET @author = author;
		SET @tags = tags;
		SET @body = body;
		SET @published = published;
		SET @postUpdateVar = CONCAT('UPDATE family_johansen.posts ',
		                            'SET featured         = ?, ',
		                            '    video            = ?, ',
		                            '    title            = ?, ',
		                            '    normalized_title = ?, ',
		                            '    post_date        = ?, ',
		                            '    author           = ?, ',
		                            '    tags             = ?, ',
		                            '    body             = ?, ',
		                            '    published        = ?  ',
		                            'WHERE id = ? ',
		                            'LIMIT 1');
		PREPARE postUpdateStmt FROM @postUpdateVar;
		EXECUTE postUpdateStmt USING @featured, @video, @title, @normed, @postDate, @author, @tags, @body, @published, @id;
		SELECT @id AS id;
		DEALLOCATE PREPARE postUpdateStmt;
	END
	//
DELIMITER ;

/* deletePost() */

DROP PROCEDURE IF EXISTS family_johansen.deletePost;
DELIMITER //
CREATE PROCEDURE family_johansen.deletePost(id INT)
	BEGIN
		SET @id = id;
		SET @postDeleteVar = CONCAT('DELETE FROM family_johansen.posts ',
		                            'WHERE id = ?');
		PREPARE postDeleteStmt FROM @postDeleteVar;
		EXECUTE postDeleteStmt USING @id;
		DEALLOCATE PREPARE postDeleteStmt;
	END
	//
DELIMITER ;
