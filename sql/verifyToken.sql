DROP PROCEDURE IF EXISTS family_johansen.verifyToken;
DELIMITER //
CREATE PROCEDURE family_johansen.verifyToken(tok VARCHAR(36))
	BEGIN
	    SET @token = tok;
			SET @resetDate = NULL;
			SET @valid = FALSE;
			SET @resetDateLookupVar = CONCAT('SELECT reset_date ',
			                                 'INTO @resetDate ',
			                                 'FROM family_johansen.authors ',
			                                 'WHERE LOWER(token) = LOWER(?)');
			PREPARE resetDateLookupStmt FROM @resetDateLookupVar;
			EXECUTE resetDateLookupStmt USING @token;
			DEALLOCATE PREPARE resetDateLookupStmt;

			IF @resetDate IS NOT NULL AND @resetDate <= @resetDate + INTERVAL 2 DAY THEN
				SET @valid = TRUE;
			END IF;
		SELECT @valid AS valid;
	END
	//
DELIMITER ;