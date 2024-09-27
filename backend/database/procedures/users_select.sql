USE `epitreplot`;
DROP procedure IF EXISTS `users_select`;

DELIMITER $$
USE `epitreplot`$$
CREATE PROCEDURE `users_select` (IN _id INT)
BEGIN
    SELECT *
    FROM epitreplot.users
    WHERE (_id IS NULL OR id = _id);
END$$

DELIMITER ;

