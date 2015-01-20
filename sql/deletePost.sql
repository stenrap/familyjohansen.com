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