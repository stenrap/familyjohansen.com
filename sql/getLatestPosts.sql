DROP PROCEDURE IF EXISTS family_johansen.getLatestPosts;
DELIMITER //
CREATE PROCEDURE family_johansen.getLatestPosts(offset INT) /* zero-based offset */
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