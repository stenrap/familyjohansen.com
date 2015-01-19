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