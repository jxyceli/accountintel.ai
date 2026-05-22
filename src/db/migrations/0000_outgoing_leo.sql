CREATE TABLE `companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`domain` text NOT NULL,
	`company_name` text NOT NULL,
	`company_description` text,
	`industry` text,
	`website_url` text,
	`employees` text,
	`revenue` text,
	`hq` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `companies_domain_unique` ON `companies` (`domain`);