DROP PROCEDURE IF EXISTS family_johansen.verifyUser;
DELIMITER //
CREATE PROCEDURE family_johansen.verifyUser(userNm VARCHAR(50), passWd VARCHAR(255))
	BEGIN
		SET @username = userNm;
		SET @password = passWd;
		
		/* WYLO .... This actually needs to return the hashed password so that the bcrypt module can call compare() on it. */
		
		SET @userSelectVar = CONCAT('SELECT COUNT(*) AS num ',
		                             'FROM family_johansen.authors ',
		                             'WHERE username = ? AND password = ?');
		PREPARE userSelectStmt FROM @userSelectVar;
		EXECUTE userSelectStmt USING @username, @password;
		DEALLOCATE PREPARE userSelectStmt;
	END
	//
DELIMITER ;