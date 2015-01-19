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