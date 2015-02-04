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