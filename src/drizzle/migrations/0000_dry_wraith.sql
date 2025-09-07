CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`discount` int,
	`image` varchar(255),
	`category_id` int unsigned NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`name` varchar(100),
	`designation` varchar(255),
	`last_visited_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_by` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;