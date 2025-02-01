CREATE TABLE `epitreplot`.`cards` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(55) NOT NULL,
    `lists_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    INDEX `fk_cards_lists_idx` (`lists_id` ASC) VISIBLE,
    CONSTRAINT `fk_cards_lists`
        FOREIGN KEY (`lists_id`)
        REFERENCES `epitreplot`.`lists` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE);
