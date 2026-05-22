CREATE TABLE `competitor_market_moves` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`competitor_id` integer NOT NULL,
	`move_type` text NOT NULL,
	`severity` text DEFAULT 'info',
	`title` text NOT NULL,
	`description` text,
	`source_url` text,
	`detected_at` integer,
	FOREIGN KEY (`competitor_id`) REFERENCES `competitors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `competitors` ADD `monitoring_status` text DEFAULT 'Active';--> statement-breakpoint
ALTER TABLE `competitors` ADD `owner` text;--> statement-breakpoint
ALTER TABLE `competitors` ADD `notes` text;--> statement-breakpoint
ALTER TABLE `competitors` ADD `website_url` text;--> statement-breakpoint
ALTER TABLE `competitors` ADD `pricing_url` text;--> statement-breakpoint
ALTER TABLE `competitors` ADD `last_hashed` text;