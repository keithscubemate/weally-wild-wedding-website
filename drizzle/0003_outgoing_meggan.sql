ALTER TABLE `party` RENAME COLUMN "is_rsvp" TO "finalized";--> statement-breakpoint
DROP TABLE `task`;--> statement-breakpoint
ALTER TABLE `party` ADD `notes` text;--> statement-breakpoint
ALTER TABLE `guest` DROP COLUMN `notes`;