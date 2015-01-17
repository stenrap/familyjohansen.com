DROP PROCEDURE IF EXISTS family_johansen.getUser;
DELIMITER //
CREATE PROCEDURE family_johansen.getUser(userNm VARBINARY(50))
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