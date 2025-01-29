CREATE TABLE `epitreplot`.`workspaces` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(55) NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_workspaces_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_workspaces_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `epitreplot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
