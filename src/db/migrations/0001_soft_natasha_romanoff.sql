CREATE TABLE `competitors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer NOT NULL,
	`competitor_name` text NOT NULL,
	`geographies` text,
	`market_cap` text,
	`main_products` text,
	`target_demographics` text,
	`created_at` integer,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE cascade
);
