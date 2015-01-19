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
                                            body TEXT)
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
		SET @postUpdateVar = CONCAT('UPDATE family_johansen.posts ',
		                            'SET featured         = ?, ',
		                            '    video            = ?, ',
		                            '    title            = ?, ',
		                            '    normalized_title = ?, ',
		                            '    post_date        = ?, ',
		                            '    author           = ?, ',
		                            '    tags             = ?, ',
		                            '    body             = ?  ',
		                            'WHERE id = ? ',
		                            'LIMIT 1');
		PREPARE postUpdateStmt FROM @postUpdateVar;
		EXECUTE postUpdateStmt USING @featured, @video, @title, @normed, @postDate, @author, @tags, @body, @id;
		SELECT @id AS id;
		DEALLOCATE PREPARE postUpdateStmt;
	END
	//
DELIMITER ;