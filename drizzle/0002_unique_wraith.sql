ALTER TABLE `group` RENAME TO `party`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guest` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`party_id` text,
	`is_rsvp` integer DEFAULT 0 NOT NULL,
	`is_adult` integer DEFAULT 1,
	`notes` text,
	FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_guest`("id", "name", "party_id", "is_rsvp", "is_adult", "notes") SELECT "id", "name", "group_id", "is_rsvp", "is_adult", "notes" FROM `guest`;--> statement-breakpoint
DROP TABLE `guest`;--> statement-breakpoint
ALTER TABLE `__new_guest` RENAME TO `guest`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
