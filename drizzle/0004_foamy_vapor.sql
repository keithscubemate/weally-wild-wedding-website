DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
DROP TABLE `verification`;--> statement-breakpoint
CREATE UNIQUE INDEX `guest_name_unique` ON `guest` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `party_name_unique` ON `party` (`name`);