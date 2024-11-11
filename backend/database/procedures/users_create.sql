USE `epitreplot`;
DROP procedure IF EXISTS `users_create`;

USE `epitreplot`;
DROP procedure IF EXISTS `epitreplot`.`users_create`;
;

DELIMITER $$
USE `epitreplot`$$
CREATE DEFINER=`nox`@`%` PROCEDURE `users_create`(
    IN _name VARCHAR(45), 
    IN _surname VARCHAR(45), 
    IN _display_name VARCHAR(45), 
    IN _avatar LONGBLOB
)
BEGIN
	IF _display_name = '' THEN
        SET _display_name = NULL;
    END IF;

    INSERT INTO users (name, surname, display_name, avatar)
    VALUES (_name, _surname, _display_name, _avatar);
END$$

DELIMITER ;
;

