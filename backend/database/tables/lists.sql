CREATE TABLE `epitreplot`.`lists` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(55) NOT NULL,
    `workspaces_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    INDEX `fk_lists_workspaces_idx` (`workspaces_id` ASC) VISIBLE,
    CONSTRAINT `fk_lists_workspaces`
        FOREIGN KEY (`workspaces_id`)
        REFERENCES `epitreplot`.`workspaces` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE);
