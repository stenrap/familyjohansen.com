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