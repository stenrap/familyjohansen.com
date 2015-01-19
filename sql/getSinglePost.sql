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