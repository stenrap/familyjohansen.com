DROP PROCEDURE IF EXISTS family_johansen.resetToken;
DELIMITER //
CREATE PROCEDURE family_johansen.resetToken(em VARCHAR(50))
	BEGIN
		START TRANSACTION;
			SET @authorId = NULL;
			SET @uuid = NULL;
			SET @email = em;
			SET @authorLookupVar = CONCAT('SELECT id ',
			                              'INTO @authorId ',
			                              'FROM family_johansen.authors ',
			                              'WHERE LOWER(email) = LOWER(?)');
			PREPARE authorLookupStmt FROM @authorLookupVar;
			EXECUTE authorLookupStmt USING @email;
			DEALLOCATE PREPARE authorLookupStmt;

			IF @authorId IS NOT NULL THEN
			  SET @uuid = UUID();
				SET @authorUpdateVar = CONCAT('UPDATE family_johansen.authors ',
				                              'SET token = ?, reset_date = CURDATE() ',
				                              'WHERE id = ?');
				PREPARE authorUpdateStmt FROM @authorUpdateVar;
				EXECUTE authorUpdateStmt USING @uuid, @authorId;
				DEALLOCATE PREPARE authorUpdateStmt;
			END IF;
		COMMIT;
		IF @uuid IS NOT NULL THEN
		  SELECT @uuid AS token;
		END IF;
	END
	//
DELIMITER ;