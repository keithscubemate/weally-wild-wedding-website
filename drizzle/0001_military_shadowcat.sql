CREATE TABLE `group` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_rsvp` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guest` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`group_id` text,
	`is_rsvp` integer DEFAULT 0 NOT NULL,
	`is_adult` integer DEFAULT 1,
	`notes` text,
	FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade
);
