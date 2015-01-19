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