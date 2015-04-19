DROP PROCEDURE IF EXISTS family_johansen.resetPassword;
DELIMITER //
CREATE PROCEDURE family_johansen.resetPassword(pass VARCHAR(255),
                                               tok VARCHAR(36))
	BEGIN
    SET @password = pass;
    SET @token = tok;
    SET @success = FALSE;
    SET @rowCount = 0;

    IF @token IS NOT NULL THEN
      SET @passwordUpdateVar = CONCAT('UPDATE family_johansen.authors ',
                                      'SET password = ?, token = NULL, reset_date = NULL ',
                                      'WHERE token  = ? ',
                                      'LIMIT 1');
      PREPARE passwordUpdateStmt FROM @passwordUpdateVar;
      EXECUTE passwordUpdateStmt USING @password, @token;
      SELECT ROW_COUNT() INTO @rowCount;
      DEALLOCATE PREPARE passwordUpdateStmt;

      IF @rowCount = 1 THEN
        SET @success = TRUE;
      END IF;
    END IF;

    SELECT @success as success;

	END
	//
DELIMITER ;