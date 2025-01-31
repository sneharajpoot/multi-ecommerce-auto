-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 31, 2025 at 01:59 PM
-- Server version: 10.1.45-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `multi_store_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `AuditLogs`
--

CREATE TABLE `AuditLogs` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `action` enum('Create','Update','Delete') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityType` enum('User','Product','Order','Store') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int(11) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Banners`
--

CREATE TABLE `Banners` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'The title of the banner',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT 'Description or tagline of the banner',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL of the banner image',
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'The URL the banner points to when clicked',
  `is_active` tinyint(1) DEFAULT '1' COMMENT 'Indicates whether the banner is active',
  `start_date` datetime DEFAULT NULL COMMENT 'The date when the banner becomes active',
  `end_date` datetime DEFAULT NULL COMMENT 'The date when the banner becomes inactive',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Banners`
--

INSERT INTO `Banners` (`id`, `title`, `description`, `image_url`, `link_url`, `is_active`, `start_date`, `end_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'sss', 'ss', '/qqq_extra.png', 'null', 1, '2025-01-29 00:00:00', '1970-01-31 00:00:00', '2025-01-28 16:28:24', '2025-01-29 16:34:24', NULL),
(2, 'Banner', 'DEZXZX', '/Screenshot 2024-09-04 062851_extra.png', 'null', 1, '2025-01-14 00:00:00', '2025-01-31 00:00:00', '2025-01-28 16:41:38', '2025-01-29 16:38:41', NULL),
(3, 'bannar', 'dkka sd das d s dsa d ddddas d ada', '/Screenshot 2024-09-04 062532_extra.png', '', 1, '2025-01-11 00:00:00', '2025-01-31 00:00:00', '2025-01-29 16:43:29', '2025-01-29 16:43:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `BulkUploadLogs`
--

CREATE TABLE `BulkUploadLogs` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `error_log` text COLLATE utf8mb4_unicode_ci,
  `uploaded_by` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Bulk_Upload_Logs`
--

CREATE TABLE `Bulk_Upload_Logs` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `error_log` text COLLATE utf8mb4_unicode_ci,
  `uploaded_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`id`, `uuid`, `customer_id`, `product_id`, `quantity`, `variant_id`, `createdAt`, `updatedAt`) VALUES
(17, '13cb8f58-4f96-410f-958f-e996cc73f61b', 1, 1, 2, 7, '2025-01-26 17:03:24', '2025-01-26 17:03:36');

-- --------------------------------------------------------

--
-- Table structure for table `CartItems`
--

CREATE TABLE `CartItems` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `variantId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'stinr 1', 'd', 0, '2025-01-15 15:32:38', '2025-01-16 15:23:36'),
(2, 'string', NULL, 1, '2025-01-15 16:15:40', '2025-01-16 15:01:35');

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_comment_id` int(11) DEFAULT NULL,
  `comment_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Discounts`
--

CREATE TABLE `Discounts` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `discount_type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT '0',
  `warehouse_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entity_type` enum('review','comment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int(11) NOT NULL,
  `is_like` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MailerConfig`
--

CREATE TABLE `MailerConfig` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('SMTP','AWS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `smtpServer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpPort` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `awsAccessKey` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `awsSecretKey` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `awsRegion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enableSSL` tinyint(1) DEFAULT '0',
  `timeoutMs` int(11) DEFAULT '1000',
  `purpose` enum('Welcome','ForgotPassword','OrderConfirmation','Promotion') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MailLogs`
--

CREATE TABLE `MailLogs` (
  `id` int(11) NOT NULL,
  `mailTemplateId` int(11) NOT NULL,
  `recipientEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('sent','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'sent',
  `sentAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MailTemplates`
--

CREATE TABLE `MailTemplates` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `variables` text COLLATE utf8mb4_unicode_ci,
  `locale` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `isHtml` tinyint(1) DEFAULT '1',
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Modules`
--

CREATE TABLE `Modules` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Modules`
--

INSERT INTO `Modules` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Products', 'Manage products in the store', '2025-01-13 03:43:00', '2025-01-13 03:43:00'),
(2, 'Orders', 'Manage orders placed by customers', '2025-01-13 03:43:00', '2025-01-13 03:43:00'),
(3, 'Reports', 'View analytics and reports', '2025-01-13 03:43:00', '2025-01-13 03:43:00'),
(4, 'USER 1', 'user logina', '2025-01-19 15:46:22', '2025-01-19 15:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `Newsletter`
--

CREATE TABLE `Newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_subscribed` tinyint(1) NOT NULL DEFAULT '1',
  `subscribed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','unsubscribed') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Newsletter`
--

INSERT INTO `Newsletter` (`id`, `email`, `is_subscribed`, `subscribed_at`, `unsubscribed_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 'test@gmail.com', 1, '2025-01-26 14:59:18', NULL, 'active', '2025-01-26 14:59:18', '2025-01-26 14:59:18');

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Order','Shipping','System','Promotion') COLLATE utf8mb4_unicode_ci DEFAULT 'System',
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Notifications`
--

INSERT INTO `Notifications` (`id`, `uuid`, `userId`, `message`, `type`, `isRead`, `createdAt`) VALUES
(1, '7714368c-d14f-11ef-914f-00505640474e', 1, 'Your order #123 has been shipped!', 'Order', 0, '2025-01-13 03:41:11'),
(2, '7715d2be-d14f-11ef-914f-00505640474e', 1, 'Get 20% off your next purchase! Use code: WELCOME20.', 'Promotion', 0, '2025-01-13 03:41:11');

-- --------------------------------------------------------

--
-- Table structure for table `OrderItems`
--

CREATE TABLE `OrderItems` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OrderItems`
--

INSERT INTO `OrderItems` (`id`, `order_id`, `store_id`, `product_id`, `variant_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(4, 4, 1, 1, 7, 4, '88.00', '2025-01-25 09:40:00', '2025-01-25 09:40:00'),
(5, 3, 1, 7, 9, 2, '2.00', '2025-01-25 09:40:00', '2025-01-25 09:40:00'),
(6, 4, 1, 8, 8, 2, '7.00', '2025-01-25 09:40:00', '2025-01-25 09:40:00'),
(7, 6, 1, 8, 8, 6, '7.00', '2025-01-26 07:53:32', '2025-01-26 07:53:32'),
(8, 6, 1, 1, 7, 2, '88.00', '2025-01-26 07:53:32', '2025-01-26 07:53:32'),
(9, 7, 1, 1, 7, 5, '88.00', '2025-01-26 16:59:32', '2025-01-26 16:59:32'),
(10, 7, 1, 8, 8, 2, '7.00', '2025-01-26 16:59:32', '2025-01-26 16:59:32'),
(11, 7, 1, 7, 10, 2, '7.00', '2025-01-26 16:59:33', '2025-01-26 16:59:33'),
(12, 8, 1, 1, 7, 2, '88.00', '2025-01-26 17:03:20', '2025-01-26 17:03:20'),
(13, 9, 1, 1, 7, 2, '88.00', '2025-01-26 17:06:55', '2025-01-26 17:06:55'),
(14, 10, 1, 1, 7, 2, '88.00', '2025-01-26 17:08:30', '2025-01-26 17:08:30'),
(15, 11, 1, 1, 7, 2, '88.00', '2025-01-26 17:17:12', '2025-01-26 17:17:12'),
(16, 12, 1, 1, 7, 2, '88.00', '2025-01-26 17:22:13', '2025-01-26 17:22:13'),
(17, 13, 1, 1, 7, 2, '88.00', '2025-01-26 17:24:10', '2025-01-26 17:24:10'),
(18, 14, 1, 1, 7, 2, '88.00', '2025-01-26 17:26:24', '2025-01-26 17:26:24'),
(19, 15, 1, 1, 7, 2, '88.00', '2025-01-26 17:38:58', '2025-01-26 17:38:58'),
(20, 16, 1, 1, 7, 2, '88.00', '2025-01-26 17:41:26', '2025-01-26 17:41:26'),
(21, 17, 1, 1, 7, 2, '88.00', '2025-01-27 01:02:43', '2025-01-27 01:02:43'),
(22, 18, 1, 1, 7, 2, '88.00', '2025-01-27 02:05:52', '2025-01-27 02:05:52'),
(23, 19, 1, 1, 7, 2, '88.00', '2025-01-27 02:12:53', '2025-01-27 02:12:53'),
(24, 20, 1, 1, 7, 2, '88.00', '2025-01-27 02:30:19', '2025-01-27 02:30:19'),
(25, 21, 1, 1, 7, 2, '88.00', '2025-01-27 02:38:12', '2025-01-27 02:38:12'),
(26, 22, 1, 1, 7, 2, '88.00', '2025-01-27 03:03:08', '2025-01-27 03:03:08'),
(27, 23, 1, 1, 7, 4, '88.00', '2025-01-27 08:53:27', '2025-01-27 08:53:27'),
(28, 24, 1, 1, 7, 4, '88.00', '2025-01-27 16:42:52', '2025-01-27 16:42:52'),
(29, 25, 1, 1, 7, 4, '88.00', '2025-01-27 16:43:06', '2025-01-27 16:43:06'),
(30, 26, 1, 1, 7, 4, '88.00', '2025-01-27 16:43:35', '2025-01-27 16:43:35'),
(31, 27, 1, 7, 9, 2, '2.00', '2025-01-27 16:43:55', '2025-01-27 16:43:55'),
(32, 27, 1, 1, 7, 4, '88.00', '2025-01-27 16:43:55', '2025-01-27 16:43:55'),
(33, 28, 1, 1, 7, 4, '88.00', '2025-01-27 17:13:00', '2025-01-27 17:13:00'),
(34, 28, 1, 7, 9, 2, '2.00', '2025-01-27 17:13:00', '2025-01-27 17:13:00');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_address_history_id` int(11) DEFAULT NULL,
  `tracking_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Pending','Processing','Shipped','Delivered','Returned','Canceled') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `status_id` int(11) NOT NULL,
  `cash_on_delivery` tinyint(1) NOT NULL DEFAULT '0',
  `payment_status` enum('Pending Payment','Payment Confirmed','Payment Failed','') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending Payment',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`id`, `uuid`, `customer_id`, `total_amount`, `shipping_address_history_id`, `tracking_number`, `status`, `status_id`, `cash_on_delivery`, `payment_status`, `createdAt`, `updatedAt`) VALUES
(1, '006e3812-d14e-11ef-914f-00505640474e', 1, '59.98', NULL, NULL, '', 0, 0, 'Pending Payment', '2025-01-13 03:30:42', '2025-01-13 03:34:18'),
(3, 'd25b631d-daf7-11ef-914f-00505640474e', 22, '370.00', 6, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-25 09:39:00', '2025-01-25 09:39:00'),
(4, 'f62de95e-daf7-11ef-914f-00505640474e', 22, '370.00', 7, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-25 09:40:00', '2025-01-25 09:40:00'),
(5, 'd4aa66c6-dbb1-11ef-914f-00505640474e', 1, '218.00', 8, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 07:50:30', '2025-01-26 07:50:30'),
(6, '41315d22-dbb2-11ef-914f-00505640474e', 1, '218.00', 9, NULL, 'Canceled', 3, 0, 'Pending Payment', '2025-01-26 07:53:32', '2025-01-26 09:03:02'),
(7, '87c0414a-dbfe-11ef-914f-00505640474e', 1, '468.00', 10, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 16:59:32', '2025-01-26 16:59:32'),
(8, '0f813ab4-dbff-11ef-914f-00505640474e', 1, '176.00', 11, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:03:20', '2025-01-26 17:03:20'),
(9, '8f7a6608-dbff-11ef-914f-00505640474e', 1, '176.00', 12, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:06:55', '2025-01-26 17:06:55'),
(10, 'c8702698-dbff-11ef-914f-00505640474e', 1, '176.00', 13, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:08:30', '2025-01-26 17:08:30'),
(11, 'ff0f7ed5-dc00-11ef-914f-00505640474e', 1, '176.00', 14, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:17:11', '2025-01-26 17:17:11'),
(12, 'b27ff766-dc01-11ef-914f-00505640474e', 1, '176.00', 15, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:22:12', '2025-01-26 17:22:12'),
(13, 'f8d1a4f5-dc01-11ef-914f-00505640474e', 1, '176.00', 16, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:24:10', '2025-01-26 17:24:10'),
(14, '4862ef25-dc02-11ef-914f-00505640474e', 1, '176.00', 17, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:26:24', '2025-01-26 17:26:24'),
(15, '09d6a820-dc04-11ef-914f-00505640474e', 1, '176.00', 18, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:38:58', '2025-01-26 17:38:58'),
(16, '621f10fb-dc04-11ef-914f-00505640474e', 1, '176.00', 19, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-26 17:41:26', '2025-01-26 17:41:26'),
(17, '077aebf5-dc42-11ef-914f-00505640474e', 1, '176.00', 20, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 01:02:43', '2025-01-27 01:02:43'),
(18, 'd9cc4e4e-dc4a-11ef-914f-00505640474e', 1, '176.00', 21, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 02:05:52', '2025-01-27 02:05:52'),
(19, 'd4fc0ee0-dc4b-11ef-914f-00505640474e', 1, '176.00', 22, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 02:12:53', '2025-01-27 02:12:53'),
(20, '4464847f-dc4e-11ef-914f-00505640474e', 1, '176.00', 23, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 02:30:19', '2025-01-27 02:30:19'),
(21, '5e54a2bd-dc4f-11ef-914f-00505640474e', 1, '176.00', 24, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 02:38:12', '2025-01-27 02:38:12'),
(22, 'da40f4c3-dc52-11ef-914f-00505640474e', 1, '176.00', 25, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 03:03:08', '2025-01-27 03:03:08'),
(23, 'ca68f5cb-dc83-11ef-914f-00505640474e', 2, '352.00', 26, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 08:53:27', '2025-01-27 08:53:27'),
(24, '5ddcf15f-dcc5-11ef-914f-00505640474e', 2, '352.00', 27, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 16:42:52', '2025-01-27 16:42:52'),
(25, '6613343f-dcc5-11ef-914f-00505640474e', 2, '352.00', 28, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 16:43:05', '2025-01-27 16:43:05'),
(26, '77bcbfb9-dcc5-11ef-914f-00505640474e', 2, '352.00', 29, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 16:43:35', '2025-01-27 16:43:35'),
(27, '833733f7-dcc5-11ef-914f-00505640474e', 2, '356.00', 30, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 16:43:54', '2025-01-27 16:43:54'),
(28, '9355fe49-dcc9-11ef-914f-00505640474e', 2, '356.00', 31, NULL, 'Pending', 0, 0, 'Pending Payment', '2025-01-27 17:12:59', '2025-01-27 17:12:59');

-- --------------------------------------------------------

--
-- Table structure for table `OrderStatuses`
--

CREATE TABLE `OrderStatuses` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `status_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OrderStatuses`
--

INSERT INTO `OrderStatuses` (`id`, `order`, `status_name`, `description`, `created_at`) VALUES
(1, 1, 'Pending', 'Order placed but not yet confirmed', '2025-01-25 14:10:24'),
(2, 2, 'Payment Confirmed', 'Payment has been successfully processed', '2025-01-25 14:10:24'),
(3, 3, 'Order Confirmed', 'Order has been confirmed and is ready for processing', '2025-01-25 14:10:24'),
(4, 4, 'Processing', 'Items are being prepared in the warehouse', '2025-01-25 14:10:24'),
(5, 5, 'Quality Check', 'Items are undergoing a quality check before packing', '2025-01-25 14:10:24'),
(6, 6, 'Packed', 'Items have been packed and are ready for shipping', '2025-01-25 14:10:24'),
(7, 7, 'Ready for Shipment', 'The package is ready for pickup or dispatch', '2025-01-25 14:10:24'),
(8, 8, 'Shipped', 'The order has been shipped and is in transit', '2025-01-25 14:10:24'),
(9, 9, 'Arrived at Local Hub', 'Package has reached the local delivery hub', '2025-01-25 14:10:24'),
(10, 10, 'Out for Delivery', 'Delivery agent is en route to the customer', '2025-01-25 14:10:24'),
(11, 11, 'Delivered', 'Order has been delivered to the customer', '2025-01-25 14:10:24'),
(12, 12, 'Completed', 'The order is successfully closed', '2025-01-25 14:10:24'),
(13, 13, 'Canceled', 'The order was canceled before processing', '2025-01-25 14:10:24'),
(14, 14, 'Returned', 'Customer has returned the order', '2025-01-25 14:10:24'),
(15, 15, 'Refunded', 'Refund has been issued for the returned or canceled order', '2025-01-25 14:10:24');

-- --------------------------------------------------------

--
-- Table structure for table `OrderStatusHistory`
--

CREATE TABLE `OrderStatusHistory` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `is_visible` int(11) NOT NULL,
  `action_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OrderStatusHistory`
--

INSERT INTO `OrderStatusHistory` (`id`, `order_id`, `status_id`, `is_visible`, `action_date`, `created_at`, `updated_at`) VALUES
(1, 4, 2, 1, NULL, '2025-01-25 15:58:43', '2025-01-26 05:24:17'),
(2, 4, 13, 1, NULL, '2025-01-26 04:26:43', '2025-01-26 05:24:19'),
(3, 4, 12, 1, NULL, '2025-01-26 04:26:44', '2025-01-26 05:24:19'),
(4, 4, 0, 1, NULL, '2025-01-26 05:09:50', '2025-01-26 05:09:50'),
(5, 3, 0, 1, NULL, '2025-01-26 07:27:11', '2025-01-26 07:27:11'),
(6, 5, 0, 1, NULL, '2025-01-26 08:22:30', '2025-01-26 08:22:30'),
(7, 5, 3, 1, NULL, '2025-01-26 08:25:30', '2025-01-26 08:25:30'),
(8, 6, 3, 1, NULL, '2025-01-26 08:25:55', '2025-01-26 08:25:55'),
(9, 6, 3, 1, NULL, '2025-01-26 08:46:30', '2025-01-26 08:46:30'),
(10, 6, 3, 1, NULL, '2025-01-26 08:47:17', '2025-01-26 08:47:17'),
(11, 6, 3, 1, NULL, '2025-01-26 08:47:17', '2025-01-26 08:47:17'),
(12, 6, 3, 1, NULL, '2025-01-26 08:55:13', '2025-01-26 08:55:13'),
(13, 6, 3, 1, NULL, '2025-01-26 08:59:36', '2025-01-26 08:59:36'),
(14, 6, 3, 1, NULL, '2025-01-26 09:00:31', '2025-01-26 09:00:31'),
(15, 6, 3, 1, NULL, '2025-01-26 09:02:38', '2025-01-26 09:02:38'),
(16, 6, 3, 1, NULL, '2025-01-26 09:12:51', '2025-01-26 09:12:51'),
(17, 6, 3, 1, NULL, '2025-01-26 09:13:31', '2025-01-26 09:13:31'),
(18, 6, 3, 1, NULL, '2025-01-26 09:14:14', '2025-01-26 09:14:14'),
(19, 6, 3, 1, NULL, '2025-01-26 09:14:41', '2025-01-26 09:14:41'),
(20, 6, 3, 1, NULL, '2025-01-26 09:34:37', '2025-01-26 09:34:37');

-- --------------------------------------------------------

--
-- Table structure for table `PaymentGateways`
--

CREATE TABLE `PaymentGateways` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('razorpay','paytm','paypal','stripe') COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PaymentGateways`
--

INSERT INTO `PaymentGateways` (`id`, `name`, `type`, `api_key`, `api_secret`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Razorpay', 'razorpay', 'rzp_test_adcAVlhJCsuoVY', '4OWlr4WrOLFdX0rovmBEDDEo', 1, '2025-01-26 17:16:43', '2025-01-26 17:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `PaymentRefunds`
--

CREATE TABLE `PaymentRefunds` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `refund_transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','processed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `gateway_transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razorpay_payment_id` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razorpay_signature` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`id`, `order_id`, `gateway_id`, `gateway_transaction_id`, `razorpay_payment_id`, `razorpay_signature`, `status`, `amount`, `created_at`, `updated_at`) VALUES
(1, 14, 1, 'order_Po9bRtZ7XfJvdh', NULL, NULL, 'pending', '176.00', '2025-01-26 17:26:55', '2025-01-26 17:26:55'),
(2, 14, 1, 'order_Po9cgjQaHvpSMg', NULL, NULL, 'pending', '176.00', '2025-01-26 17:28:05', '2025-01-26 17:28:05'),
(3, 14, 1, 'order_Po9diPKcUjr0ys', NULL, NULL, 'pending', '176.00', '2025-01-26 17:29:04', '2025-01-26 17:29:04'),
(4, 14, 1, 'order_Po9fUX9pWLerRc', NULL, NULL, 'pending', '176.00', '2025-01-26 17:30:45', '2025-01-26 17:30:45'),
(5, 14, 1, 'order_Po9gF7pMdXNTEL', NULL, NULL, 'pending', '176.00', '2025-01-26 17:31:27', '2025-01-26 17:31:27'),
(6, 14, 1, 'order_Po9iOIpdv38Ck0', NULL, NULL, 'pending', '176.00', '2025-01-26 17:33:29', '2025-01-26 17:33:29'),
(7, 14, 1, 'order_Po9oKBhdLceRNr', NULL, NULL, 'pending', '176.00', '2025-01-26 17:39:06', '2025-01-26 17:39:06'),
(8, 15, 1, 'order_Po9oiPuKhWtG0s', NULL, NULL, 'pending', '176.00', '2025-01-26 17:39:28', '2025-01-26 17:39:28'),
(9, 16, 1, 'order_Po9rIgVeoZtei7', NULL, NULL, 'pending', '176.00', '2025-01-26 17:41:55', '2025-01-26 17:41:55'),
(10, 17, 1, 'order_PoHNTFgCNSEvvd', NULL, NULL, 'success', '176.00', '2025-01-27 01:03:14', '2025-01-27 01:07:24'),
(11, 20, 1, 'order_PoIwltZxPBAHFv', NULL, NULL, 'pending', '176.00', '2025-01-27 02:35:21', '2025-01-27 02:35:21'),
(12, 21, 1, 'order_PoJ0GLjNT5Wvrv', NULL, NULL, 'pending', '176.00', '2025-01-27 02:38:39', '2025-01-27 02:38:39'),
(13, 22, 1, 'order_PoJQfeowsClqC5', NULL, NULL, 'pending', '176.00', '2025-01-27 03:03:40', '2025-01-27 03:03:40'),
(14, 23, 1, 'order_PoPOtUIpVCla0z', NULL, NULL, 'pending', '352.00', '2025-01-27 08:54:08', '2025-01-27 08:54:08');

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE `Permissions` (
  `id` int(11) NOT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`id`, `action`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'View', 'Permission to view records', '2025-01-13 03:46:06', '2025-01-13 03:46:06'),
(2, 'Edit', 'Permission to edit records', '2025-01-13 03:46:06', '2025-01-13 03:46:06');

-- --------------------------------------------------------

--
-- Table structure for table `ProductAttributes`
--

CREATE TABLE `ProductAttributes` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `attributeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attributeValue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProductAttributes`
--

INSERT INTO `ProductAttributes` (`id`, `product_id`, `attributeName`, `attributeValue`, `createdAt`, `updatedAt`) VALUES
(1, 16, 'ahjh', 'kjk', '2025-01-18 18:08:14', '2025-01-18 18:08:14'),
(2, 16, 'ljlk', 'jl', '2025-01-18 18:08:14', '2025-01-18 18:08:14'),
(3, 23, 'aa', 'hj', '2025-01-18 18:57:47', '2025-01-18 18:57:47'),
(4, 23, 'k', 'io', '2025-01-18 18:57:47', '2025-01-18 18:57:47'),
(5, 15, 'qqw', 'wqwq', '2025-01-18 19:04:52', '2025-01-18 19:04:52'),
(6, 15, 'a', 's', '2025-01-18 19:27:30', '2025-01-18 19:27:30'),
(7, 1, 'dd', 'dd', '2025-01-19 16:09:30', '2025-01-20 13:48:04'),
(8, 1, 'fd', 'fd', '2025-01-19 16:09:48', '2025-01-20 13:48:04'),
(11, 0, 'k', '4', '2025-01-20 07:08:42', '2025-01-20 07:08:42'),
(12, 0, 'k', '4', '2025-01-20 07:16:02', '2025-01-20 07:16:02'),
(13, 0, 'k', '4', '2025-01-20 07:20:53', '2025-01-20 07:20:53'),
(14, 0, '', '', '2025-01-20 10:22:36', '2025-01-20 10:22:36'),
(15, 0, 'sljj', 'lljl', '2025-01-20 13:51:06', '2025-01-20 13:51:06'),
(16, 28, 'khk', 'k', '2025-01-20 14:06:11', '2025-01-20 14:06:11'),
(17, 28, 'd', 'w', '2025-01-20 14:07:23', '2025-01-20 14:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `ProductMetadata`
--

CREATE TABLE `ProductMetadata` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProductMetadata`
--

INSERT INTO `ProductMetadata` (`id`, `product_id`, `key`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 16, 'w', 'w', '2025-01-18 18:08:03', '2025-01-18 18:08:03'),
(2, 16, 'w', 'w', '2025-01-18 18:08:03', '2025-01-18 18:08:03'),
(3, 18, 'i', 'i', '2025-01-18 18:17:32', '2025-01-18 18:17:32'),
(4, 18, 'j', 'j', '2025-01-18 18:17:32', '2025-01-18 18:17:32'),
(5, 23, 'kj', 'kj', '2025-01-18 18:50:51', '2025-01-18 18:50:51'),
(6, 15, 'ss', 'io', '2025-01-18 19:04:46', '2025-01-18 19:04:46'),
(7, 15, 'a', 's', '2025-01-18 19:27:24', '2025-01-18 19:27:24'),
(8, 1, 'a', 'ss', '2025-01-19 16:00:50', '2025-01-19 16:06:04'),
(9, 1, 'd', 'dd', '2025-01-19 16:06:03', '2025-01-19 16:06:03'),
(13, 25, 'jk', 'jk', '2025-01-20 06:23:13', '2025-01-20 06:23:13'),
(14, 26, 'sw', 'w', '2025-01-20 06:58:53', '2025-01-20 06:58:53'),
(15, 27, '', '', '2025-01-20 10:22:34', '2025-01-20 10:22:34'),
(16, 28, 'hk', 'hhk', '2025-01-20 13:51:02', '2025-01-20 13:51:02'),
(17, 28, 'xxDD', 'D', '2025-01-20 14:03:11', '2025-01-20 14:03:11'),
(18, 33, 'khk', 'jkhkh', '2025-01-20 17:23:37', '2025-01-20 17:23:37');

-- --------------------------------------------------------

--
-- Table structure for table `ProductReviews`
--

CREATE TABLE `ProductReviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `store_id`, `category_id`, `name`, `description`, `sku`, `quantity`, `price`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, 'product1', 'string ds', 'string112', 0, '0.00', 'active', '2025-01-15 16:34:11', '2025-01-24 17:18:42'),
(7, 1, NULL, 'product2', 'string', 'string1', 0, '0.00', 'active', '2025-01-15 16:50:19', '2025-01-24 17:18:11'),
(8, 1, NULL, 'product 3', 'string', 'string12', 0, '0.00', 'active', '2025-01-15 16:52:38', '2025-01-24 17:19:13'),
(9, 1, NULL, 'p1', 'deaf', 'sli', 0, '6.00', 'active', '2025-01-16 16:21:30', '2025-01-16 16:21:30'),
(10, 1, NULL, 'po', 'er', 'err', 0, '2.00', 'active', '2025-01-16 17:32:04', '2025-01-16 17:32:04'),
(11, 1, NULL, 'p', 'p', 'ss', 0, '1.00', 'active', '2025-01-18 17:47:05', '2025-01-18 17:47:05'),
(14, 1, NULL, 'p', 'p', 'poa', 0, '1.00', 'active', '2025-01-18 17:56:37', '2025-01-18 17:56:37'),
(15, 1, NULL, 'pss', 'p', 'poaa', 0, '1.00', 'active', '2025-01-18 17:57:03', '2025-01-18 19:04:39'),
(16, 1, NULL, 'p1', 'p1', 'p1', 0, '10.00', 'active', '2025-01-18 18:04:01', '2025-01-18 18:04:01'),
(17, 1, NULL, 'p22', 'p22', 'p22', 0, '10.00', 'active', '2025-01-18 18:09:15', '2025-01-18 18:09:15'),
(18, 1, NULL, 'p2', 'po', 'op', 0, '2.00', 'active', '2025-01-18 18:17:23', '2025-01-18 18:17:23'),
(19, 1, NULL, 'p3', 'pprr', 'ppp', 0, '2.00', 'active', '2025-01-18 18:23:19', '2025-01-18 18:25:05'),
(20, 1, NULL, 'opopo', 'oopop', 'oopop', 0, '99.00', 'active', '2025-01-18 18:29:11', '2025-01-18 18:29:28'),
(21, 1, NULL, 'kjkk11', 'kjkj', 'jkk', 0, '78.00', 'active', '2025-01-18 18:32:00', '2025-01-18 18:32:25'),
(22, 1, NULL, 'iio', 'ioii', 'oioi', 0, '78.00', 'active', '2025-01-18 18:35:18', '2025-01-18 18:35:18'),
(23, 1, NULL, 'pop', 'opopo', 'pop', 0, '21.00', 'active', '2025-01-18 18:42:41', '2025-01-18 18:42:41'),
(24, 1, NULL, 'p', 'pp', 'pppq', 0, '8.00', 'active', '2025-01-20 06:16:13', '2025-01-20 06:16:13'),
(25, 1, NULL, 'll', 'll', 'llk', 0, '9.00', 'active', '2025-01-20 06:23:06', '2025-01-20 06:23:06'),
(26, 1, NULL, 'kl', 'kll', 'kll', 0, '8.00', 'active', '2025-01-20 06:58:48', '2025-01-20 06:58:48'),
(27, 1, NULL, 'sde', 'jkk', 'jkjk', 0, '8.00', 'active', '2025-01-20 10:22:31', '2025-01-20 10:22:31'),
(28, 1, NULL, 'kh', 'hkhk', 'kh', 0, '78.00', 'active', '2025-01-20 13:50:58', '2025-01-20 13:50:58'),
(29, 1, NULL, 'ss', 'kl', 'klls', 0, '67.00', 'active', '2025-01-20 16:21:15', '2025-01-20 16:21:15'),
(30, 1, NULL, 'wq', ';;ll;', 'iooi', 0, '8.00', 'active', '2025-01-20 16:33:05', '2025-01-20 16:33:05'),
(31, 1, NULL, 'wq', ';;ll;', 'iooias', 0, '8.00', 'active', '2025-01-20 16:43:36', '2025-01-20 16:43:36'),
(32, 1, NULL, 'skl', 'kll', 'kklkl', 0, '78.00', 'active', '2025-01-20 16:44:53', '2025-01-20 16:44:53'),
(33, 1, NULL, 'jhjw', 'hjhj', 'hjhj', 0, '22.00', 'active', '2025-01-20 17:19:51', '2025-01-20 17:23:24'),
(34, 1, NULL, 'ss', 'yuy', 'yuyu', 0, '87.00', 'active', '2025-01-21 01:07:12', '2025-01-21 01:07:12');

-- --------------------------------------------------------

--
-- Table structure for table `Product_Images`
--

CREATE TABLE `Product_Images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Product_Images`
--

INSERT INTO `Product_Images` (`id`, `product_id`, `url`, `is_primary`, `createdAt`, `updatedAt`) VALUES
(17, 1, '/window key_extra.png', 0, '2025-01-20 13:30:56', '2025-01-20 13:47:32'),
(20, 1, '/window key_extra.png', 0, '2025-01-20 13:34:03', '2025-01-20 13:47:32'),
(21, 1, '/window key_extra.png', 0, '2025-01-20 13:47:32', '2025-01-20 13:47:32'),
(22, 28, '/window key_extra.png', 0, '2025-01-20 13:51:09', '2025-01-20 13:51:12'),
(23, 28, '/window key_extra.png', 0, '2025-01-20 13:51:13', '2025-01-20 13:51:13');

-- --------------------------------------------------------

--
-- Table structure for table `Product_Pricing_Tiers`
--

CREATE TABLE `Product_Pricing_Tiers` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `min_quantity` int(11) NOT NULL,
  `max_quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product_Reviews`
--

CREATE TABLE `Product_Reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product_Tags`
--

CREATE TABLE `Product_Tags` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Product_Tags`
--

INSERT INTO `Product_Tags` (`id`, `product_id`, `tag`, `createdAt`, `updatedAt`) VALUES
(1, 29, 'aa', '2025-01-20 16:21:55', '2025-01-20 16:21:55'),
(2, 29, 'aasdsad', '2025-01-20 16:22:03', '2025-01-20 16:22:03'),
(3, 30, 'wwqw', '2025-01-20 16:33:11', '2025-01-20 16:33:11'),
(4, 30, 'wwqwqw ', '2025-01-20 16:33:23', '2025-01-20 16:33:23'),
(5, 31, 'ss', '2025-01-20 16:43:54', '2025-01-20 16:43:54'),
(6, 32, 'asas', '2025-01-20 16:45:02', '2025-01-20 16:45:02'),
(7, 32, 'sss', '2025-01-20 16:45:38', '2025-01-20 16:45:38'),
(8, 32, 'ss', '2025-01-20 16:47:46', '2025-01-20 16:47:46'),
(9, 32, 'ss', '2025-01-20 16:47:51', '2025-01-20 16:47:51'),
(11, 1, 'AASS', '2025-01-20 17:29:44', '2025-01-20 17:29:44');

-- --------------------------------------------------------

--
-- Table structure for table `Product_Variants`
--

CREATE TABLE `Product_Variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT '0',
  `size` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Product_Variants`
--

INSERT INTO `Product_Variants` (`id`, `product_id`, `store_id`, `name`, `sku`, `price`, `stock`, `size`, `color`, `created_at`, `updated_at`) VALUES
(2, 34, 0, 'hj', 'jkkk', '78.00', 7, NULL, NULL, '2025-01-21 01:18:49', '2025-01-21 01:18:49'),
(7, 1, 0, 'v1', 'hjh', '88.00', 3, NULL, NULL, '2025-01-24 17:18:38', '2025-01-24 17:18:38'),
(8, 8, 0, 'vv', 'wwww', '7.00', 3, NULL, NULL, '2025-01-24 17:19:10', '2025-01-24 17:19:10'),
(9, 7, 0, 'saas', ';l', '2.00', 2, NULL, NULL, '2025-01-24 17:41:37', '2025-01-24 17:41:37'),
(10, 7, 0, 'v2', 'yui', '7.00', 3, NULL, NULL, '2025-01-24 17:50:03', '2025-01-24 17:50:03'),
(11, 1, 0, 'V2', 'ddasa', '10.00', 6, NULL, NULL, '2025-01-26 15:35:53', '2025-01-26 15:36:10'),
(12, 7, 0, 'v3', 'eqw', '21.00', 2, NULL, NULL, '2025-01-26 15:36:43', '2025-01-26 15:36:43');

-- --------------------------------------------------------

--
-- Table structure for table `relatedProducts`
--

CREATE TABLE `relatedProducts` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `relatedProductId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Reviews`
--

INSERT INTO `Reviews` (`id`, `product_id`, `user_id`, `rating`, `review_text`, `status`, `created_at`, `updated_at`) VALUES
(1, 8, 2, 3, 'aas', 'pending', '2025-01-26 11:59:41', '2025-01-26 13:47:46'),
(2, 8, 1, 1, 'aa', 'pending', '2025-01-26 12:00:43', '2025-01-26 12:00:43'),
(4, 1, 1, 3, 'asas', 'pending', '2025-01-26 13:59:48', '2025-01-26 13:59:48');

-- --------------------------------------------------------

--
-- Table structure for table `RolePermissions`
--

CREATE TABLE `RolePermissions` (
  `id` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL,
  `view` tinyint(1) NOT NULL DEFAULT '1',
  `edit` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `RolePermissions`
--

INSERT INTO `RolePermissions` (`id`, `roleId`, `moduleId`, `view`, `edit`, `createdAt`, `updatedAt`) VALUES
(15, 0, 1, 1, 1, '2025-01-19 14:43:59', '2025-01-19 14:57:31'),
(16, 2, 2, 1, 1, '2025-01-19 14:44:04', '2025-01-19 14:44:04'),
(17, 0, 2, 0, 1, '2025-01-19 14:51:51', '2025-01-19 14:51:51'),
(18, 0, 3, 0, 1, '2025-01-19 14:54:33', '2025-01-19 14:54:33'),
(19, 0, 2, 1, 0, '2025-01-19 14:54:39', '2025-01-19 14:54:39'),
(20, 0, 2, 0, 1, '2025-01-19 15:02:40', '2025-01-19 15:02:40'),
(21, 0, 2, 0, 1, '2025-01-19 15:03:01', '2025-01-19 15:03:01'),
(22, 0, 2, 0, 0, '2025-01-19 15:03:02', '2025-01-19 15:03:02'),
(23, 0, 1, 0, 1, '2025-01-19 15:04:19', '2025-01-19 15:04:19'),
(24, 1, 1, 1, 0, '2025-01-19 15:39:23', '2025-01-19 15:39:23'),
(25, 1, 3, 0, 1, '2025-01-19 15:39:27', '2025-01-19 15:39:27'),
(26, 1, 2, 1, 0, '2025-01-19 15:39:32', '2025-01-19 15:39:32'),
(27, 2, 3, 0, 1, '2025-01-19 15:39:37', '2025-01-19 15:39:37'),
(28, 3, 1, 1, 0, '2025-01-19 15:40:00', '2025-01-19 15:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roleName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `uuid`, `roleName`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'b87d6e52-d14f-11ef-914f-00505640474e', 'Super Admin', 'Full access to all modules and actions', '2025-01-13 03:43:00', '2025-01-19 10:28:24'),
(2, 'b87d7744-d14f-11ef-914f-00505640474e', 'Store Admin', 'Manage store-specific modules and actions', '2025-01-13 03:43:00', '2025-01-13 03:43:00'),
(3, 'b87d78a0-d14f-11ef-914f-00505640474e', 'Worker', 'Limited access to specific modules', '2025-01-13 03:43:00', '2025-01-13 03:43:00');

-- --------------------------------------------------------

--
-- Table structure for table `ShippingAddress`
--

CREATE TABLE `ShippingAddress` (
  `id` int(11) NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ShippingAddress`
--

INSERT INTO `ShippingAddress` (`id`, `uuid`, `customer_id`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`, `createdAt`, `updatedAt`, `latitude`, `longitude`) VALUES
(1, '1eed57fa-d14e-11ef-914f-00505640474e', 1, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', '2025-01-13 03:31:33', '2025-01-24 16:59:48', NULL, NULL),
(8, 'c66fa1ef-ee47-4476-8180-4e333a1cebd0', 22, '456 Elm St', NULL, 'Los Angeles', 'CA', '90001', 'USA', '2025-01-24 16:45:59', '2025-01-24 16:45:59', NULL, NULL),
(11, 'cc9a1009-6cbc-4e59-a2fb-3e1934c44eac', 22, '123 Main St', 'Apt 4B', 'New York', 'NY', '10001', 'USA', '2025-01-24 16:50:50', '2025-01-24 16:50:50', NULL, NULL),
(12, '4930b169-587a-4ab4-9046-b3aeb7e4823f', 2, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', '2025-01-27 08:53:47', '2025-01-27 08:53:47', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ShippingAddressHistory`
--

CREATE TABLE `ShippingAddressHistory` (
  `id` int(11) NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ShippingAddressHistory`
--

INSERT INTO `ShippingAddressHistory` (`id`, `uuid`, `customer_id`, `order_id`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, '25fdd77c-d14f-11ef-914f-00505640474e', 1, 1, '123 Example St', NULL, 'New York', 'NY', '10001', 'USA', '40.71280000', '-74.00600000', '2025-01-13 03:38:55', '2025-01-25 09:30:30'),
(4, '69683eb1-daf7-11ef-914f-00505640474e', 22, 0, '456 Elm St', NULL, 'Los Angeles', 'CA', '90001', 'USA', NULL, NULL, '2025-01-25 09:36:04', '2025-01-25 09:36:04'),
(5, '9d12e13e-daf7-11ef-914f-00505640474e', 22, 0, '456 Elm St', NULL, 'Los Angeles', 'CA', '90001', 'USA', NULL, NULL, '2025-01-25 09:37:30', '2025-01-25 09:37:30'),
(6, 'd243be7b-daf7-11ef-914f-00505640474e', 22, 0, '456 Elm St', NULL, 'Los Angeles', 'CA', '90001', 'USA', NULL, NULL, '2025-01-25 09:38:59', '2025-01-25 09:38:59'),
(7, 'f6149add-daf7-11ef-914f-00505640474e', 22, 0, '456 Elm St', NULL, 'Los Angeles', 'CA', '90001', 'USA', NULL, NULL, '2025-01-25 09:40:00', '2025-01-25 09:40:00'),
(8, 'd47226e7-dbb1-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 07:50:30', '2025-01-26 07:50:30'),
(9, '41103f0c-dbb2-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 07:53:32', '2025-01-26 07:53:32'),
(10, '87a7c51b-dbfe-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 16:59:32', '2025-01-26 16:59:32'),
(11, '0f6812a8-dbff-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:03:20', '2025-01-26 17:03:20'),
(12, '8f5c3070-dbff-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:06:54', '2025-01-26 17:06:54'),
(13, 'c856ac8f-dbff-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:08:30', '2025-01-26 17:08:30'),
(14, 'fef053ee-dc00-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:17:11', '2025-01-26 17:17:11'),
(15, 'b24d943d-dc01-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:22:12', '2025-01-26 17:22:12'),
(16, 'f8b0b340-dc01-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:24:10', '2025-01-26 17:24:10'),
(17, '484a1452-dc02-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:26:24', '2025-01-26 17:26:24'),
(18, '09b8e594-dc04-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:38:58', '2025-01-26 17:38:58'),
(19, '6204cabf-dc04-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-26 17:41:26', '2025-01-26 17:41:26'),
(20, '07628b41-dc42-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 01:02:43', '2025-01-27 01:02:43'),
(21, 'd9b03fad-dc4a-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 02:05:51', '2025-01-27 02:05:51'),
(22, 'd4e0f3d5-dc4b-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 02:12:53', '2025-01-27 02:12:53'),
(23, '4448d9bc-dc4e-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 02:30:19', '2025-01-27 02:30:19'),
(24, '5e3a888c-dc4f-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 02:38:12', '2025-01-27 02:38:12'),
(25, 'da274ca4-dc52-11ef-914f-00505640474e', 1, 0, '123 Main St sss', 'Apt 4B', 'New York', 'NY', '10001', 'USA', NULL, NULL, '2025-01-27 03:03:08', '2025-01-27 03:03:08'),
(26, 'ca4e4ab1-dc83-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 08:53:27', '2025-01-27 08:53:27'),
(27, '5dc15150-dcc5-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 16:42:52', '2025-01-27 16:42:52'),
(28, '65f9abe4-dcc5-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 16:43:05', '2025-01-27 16:43:05'),
(29, '77a20ac9-dcc5-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 16:43:35', '2025-01-27 16:43:35'),
(30, '831c5f7e-dcc5-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 16:43:54', '2025-01-27 16:43:54'),
(31, '93370885-dcc9-11ef-914f-00505640474e', 2, 0, 'test', 'ty', 'ttyt', 'ty', '1223', 'india', NULL, NULL, '2025-01-27 17:12:59', '2025-01-27 17:12:59');

-- --------------------------------------------------------

--
-- Table structure for table `ShippingClasses`
--

CREATE TABLE `ShippingClasses` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Shipping_Classes`
--

CREATE TABLE `Shipping_Classes` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Stores`
--

CREATE TABLE `Stores` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ownerId` int(11) NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timezone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `isApproved` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Stores`
--

INSERT INTO `Stores` (`id`, `name`, `createdAt`, `updatedAt`, `ownerId`, `currency`, `timezone`, `status`, `isApproved`) VALUES
(1, 'Example Store new ', '2025-01-13 03:26:54', '2025-01-16 09:33:08', 2, '', '', 'active', 0),
(2, 'My Store new h', '2025-01-15 14:35:19', '2025-01-16 08:34:41', 2, 'USD', 'America/New_York', 'active', 0),
(3, 'a1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 17, '', '', 'inactive', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Tax_Rules`
--

CREATE TABLE `Tax_Rules` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `tax_rate` decimal(5,2) NOT NULL,
  `applies_to_shipping` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Translations`
--

CREATE TABLE `Translations` (
  `id` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `entityType` enum('Product','Category','Store') COLLATE utf8mb4_unicode_ci NOT NULL,
  `languageCode` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `translatedText` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserRoles`
--

CREATE TABLE `UserRoles` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserRoles`
--

INSERT INTO `UserRoles` (`id`, `userId`, `roleId`, `createdAt`) VALUES
(5, 1, 1, '2025-01-13 03:43:58');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','store_admin','customer') NOT NULL DEFAULT 'customer',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uuid` char(36) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('active','inactive','pending','deleted') DEFAULT 'active',
  `store_ids` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `phone`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `uuid`, `is_deleted`, `status`, `store_ids`) VALUES
(1, 'Admin User1', NULL, 'admin@example.com', '$2b$10$wR9HDRXgUmh7/SLl6xFFHe0zcxsgl.8aRaNSEl4ap5KwG/0SPI5zi', 'admin', '2025-01-14 12:37:58', '2025-01-19 15:32:14', NULL, 0, 'inactive', NULL),
(2, 'Store Admin User', NULL, 'storeadmin@example.com', '$2b$10$wR9HDRXgUmh7/SLl6xFFHe0zcxsgl.8aRaNSEl4ap5KwG/0SPI5zi', 'store_admin', '2025-01-14 12:37:58', '2025-01-27 03:59:30', NULL, 0, 'active', '1,2'),
(3, 'string', NULL, 'string@gamil.com', '$2b$10$XXgeEeCbcvGjxlzVQ5v9EOGytx.CwMsKStaJTd7jXzF7uzizxUIJG', 'store_admin', '2025-01-15 03:29:07', '2025-01-19 05:03:44', NULL, 0, 'active', NULL),
(4, 'string', NULL, 'stringc@gmail.com', '$2b$10$W9y0Fip/64onrVGrXDRPxuqbgiGQqQ0OnNiU7VQxgrXjwrMG9dS1e', 'customer', '2025-01-15 03:42:25', '2025-01-19 04:47:14', '5a3ed3fa-d2ea-11ef-914f-00505640474e', 1, 'active', NULL),
(6, 'string', NULL, 'string1@gmail.com', '$2b$10$o9zS4v0SJlwtdCQA6l18muUQGFSjqqWKlSttNpdWA/50fQdtbzNeS', 'store_admin', '2025-01-15 03:57:08', '2025-01-27 03:28:06', '68390fd2-d2ec-11ef-914f-00505640474e', 1, 'active', '1'),
(7, 'tete', NULL, 'uy@gmaid.com', '$2a$10$KFd.AdYOY7jcsRm9WdKJt.2czCiCdg8p3HfxvtTIPGFNkK9XlqI1q', 'admin', '2025-01-19 05:10:30', '2025-01-19 05:10:30', NULL, 0, '', NULL),
(8, 'ss', NULL, 'ss@gmasi.com', '$2b$10$18mJWaztefhQ625n0TlnYeXUJTAPM3ybqYcbEGTCWd1ejYjnrAx5q', 'customer', '2025-01-21 01:54:26', '2025-01-21 01:54:26', '42de4135-d792-11ef-914f-00505640474e', 0, 'active', NULL),
(9, 'test@gmail.com', NULL, 'test@gmail.com', '$2b$10$wR9HDRXgUmh7/SLl6xFFHe0zcxsgl.8aRaNSEl4ap5KwG/0SPI5zi', 'customer', '2025-01-21 01:54:59', '2025-01-21 17:32:00', '563bc9e4-d792-11ef-914f-00505640474e', 0, 'active', NULL),
(10, 'test@gmail.com', NULL, 'test1@gmail.com', '$2b$10$U7AME3Wjqxwh2zILYmY1lunK7KodzW7QYVsd3Bkv9v7PVzr.75vQa', 'customer', '2025-01-21 02:03:26', '2025-01-21 02:03:26', '84cf02eb-d793-11ef-914f-00505640474e', 0, 'active', NULL),
(11, 'a1@gmail.com', NULL, 'a1@gmail.com', '$2b$10$dsXqd1eq/L/GXM9/FEhaseKzJw7.8NmmiItRb1C7awlV0/1AxNKP.', 'store_admin', '2025-01-21 02:35:42', '2025-01-21 02:35:42', '06ab9616-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(12, 'a1 ', NULL, 'a11@gmail.com', '$2b$10$zkB4Mi/0szHqVaJ6abjfzee0ddU04iltz2faHr7GcEx2YQBXm.D32', 'store_admin', '2025-01-21 02:36:46', '2025-01-21 02:36:46', '2c81ef3c-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(13, 'a1 ', NULL, 'a1s1@gmail.com', '$2b$10$BFE0CMq7h8HLby.9A5qFr..j/73BDlRhtTfjWZ/p.oulLfLb8snKi', 'store_admin', '2025-01-21 02:37:57', '2025-01-21 02:37:57', '57110ea2-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(14, 'a1 ', NULL, 'a1sa1@gmail.com', '$2b$10$FfaQRIoo8P3RrMJIHnf.V.SGxuYjjUoC7bn/mIagEDWndlZpy8iAW', 'store_admin', '2025-01-21 02:39:00', '2025-01-21 02:39:00', '7c6e4c9e-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(15, 'a1 ', NULL, 'a1saa1@gmail.com', '$2b$10$d./TzD9tsSHxNHjJyZERYeEfqgV9V.z57XEdeSvjXzyESH43xXxly', 'store_admin', '2025-01-21 02:39:44', '2025-01-21 02:39:44', '96fb34c3-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(16, 'a1 ', NULL, 'a1saaa1@gmail.com', '$2b$10$GyXvLmR4analu7YxDA9N6OgeMUXAZwxDGhCXaEi7h4c7evHaYRpMG', 'store_admin', '2025-01-21 02:41:08', '2025-01-21 02:41:08', 'c91b114f-d798-11ef-914f-00505640474e', 0, 'active', NULL),
(17, 'a1 ', NULL, 'a1saaaa1@gmail.com', '$2b$10$XvTgJZGWMATOZfYuWZMESOpgaiNTB74xUkSFTAGPFGtpyXdlCbo1O', 'store_admin', '2025-01-21 02:43:12', '2025-01-27 03:28:25', '12b35d6f-d799-11ef-914f-00505640474e', 0, 'active', '3'),
(18, 'c@gmail.com', NULL, 'c@gmail.com', '$2b$10$uRu4aTOn04XyMCvqIlOb5.72D4aSeYS4VfXQ07R5br7O1qUZQeJAi', 'customer', '2025-01-23 02:30:09', '2025-01-23 02:30:09', '94cbd9d4-d929-11ef-914f-00505640474e', 0, 'active', NULL),
(19, 'c1', NULL, 'c1@gmail.com', '$2b$10$357noTCh32Dun3tnf.EffeqGnVArATrOip1s2ML5VNgAGnpk1/zBK', 'customer', '2025-01-23 02:41:41', '2025-01-23 02:41:41', '3162c1c0-d92b-11ef-914f-00505640474e', 0, 'active', NULL),
(20, 'c1', NULL, 'c2@gmail.com', '$2b$10$jd9DNkwgZWeZ51Kzb5HLcekISaEn4KDbYJ8cQ.K/.9G7eNSIt4u/a', 'customer', '2025-01-23 02:48:57', '2025-01-23 02:48:57', '3502279b-d92c-11ef-914f-00505640474e', 0, 'active', NULL),
(21, 'cc', NULL, 'cc@gmail.com', '$2b$10$ssO5KEVFjxEPBNe9kDkdBO9/Q5Cqit8JcA.DNYVHfR/oA9zWvyQuG', 'customer', '2025-01-23 02:51:30', '2025-01-23 02:51:30', '90430918-d92c-11ef-914f-00505640474e', 0, 'active', NULL),
(22, 'ccc', NULL, 'ccc@gmail.com', '$2b$10$/q/pVn2z8tGFOUXCisTkg.KNIfZWp2ukB2agdwHZdSsV7MXHgcjE.', 'customer', '2025-01-23 04:13:07', '2025-01-23 04:13:07', 'f70f33f4-d937-11ef-914f-00505640474e', 0, 'active', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Warehouse`
--

CREATE TABLE `Warehouse` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AuditLogs`
--
ALTER TABLE `AuditLogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Banners`
--
ALTER TABLE `Banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `BulkUploadLogs`
--
ALTER TABLE `BulkUploadLogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Bulk_Upload_Logs`
--
ALTER TABLE `Bulk_Upload_Logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `uuid_2` (`uuid`),
  ADD UNIQUE KEY `uuid_3` (`uuid`),
  ADD UNIQUE KEY `uuid_4` (`uuid`),
  ADD UNIQUE KEY `uuid_5` (`uuid`),
  ADD UNIQUE KEY `uuid_6` (`uuid`),
  ADD UNIQUE KEY `uuid_7` (`uuid`),
  ADD UNIQUE KEY `uuid_8` (`uuid`),
  ADD UNIQUE KEY `uuid_9` (`uuid`),
  ADD UNIQUE KEY `uuid_10` (`uuid`),
  ADD UNIQUE KEY `uuid_11` (`uuid`),
  ADD UNIQUE KEY `uuid_12` (`uuid`),
  ADD UNIQUE KEY `uuid_13` (`uuid`),
  ADD KEY `customerId` (`customer_id`),
  ADD KEY `storeId` (`product_id`);

--
-- Indexes for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `variantId` (`variantId`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_id` (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`);

--
-- Indexes for table `Discounts`
--
ALTER TABLE `Discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_discounts_store_id` (`store_id`),
  ADD KEY `fk_discounts_product_id` (`product_id`);

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_inventory_product_id` (`product_id`),
  ADD KEY `fk_inventory_variant_id` (`variant_id`);

--
-- Indexes for table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `MailerConfig`
--
ALTER TABLE `MailerConfig`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `MailLogs`
--
ALTER TABLE `MailLogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mailTemplateId` (`mailTemplateId`);

--
-- Indexes for table `MailTemplates`
--
ALTER TABLE `MailTemplates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Modules`
--
ALTER TABLE `Modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Newsletter`
--
ALTER TABLE `Newsletter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`order_id`),
  ADD KEY `productId` (`product_id`),
  ADD KEY `variantId` (`variant_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `customerId` (`customer_id`),
  ADD KEY `shippingAddressHistoryId` (`shipping_address_history_id`);

--
-- Indexes for table `OrderStatuses`
--
ALTER TABLE `OrderStatuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `OrderStatusHistory`
--
ALTER TABLE `OrderStatusHistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PaymentGateways`
--
ALTER TABLE `PaymentGateways`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `PaymentRefunds`
--
ALTER TABLE `PaymentRefunds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `gateway_id` (`gateway_id`);

--
-- Indexes for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `action` (`action`);

--
-- Indexes for table `ProductAttributes`
--
ALTER TABLE `ProductAttributes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ProductMetadata`
--
ALTER TABLE `ProductMetadata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`product_id`);

--
-- Indexes for table `ProductReviews`
--
ALTER TABLE `ProductReviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_store_id` (`store_id`);

--
-- Indexes for table `Product_Images`
--
ALTER TABLE `Product_Images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_image_id` (`product_id`);

--
-- Indexes for table `Product_Pricing_Tiers`
--
ALTER TABLE `Product_Pricing_Tiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pricing_tiers_product_id` (`product_id`);

--
-- Indexes for table `Product_Reviews`
--
ALTER TABLE `Product_Reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_reviews_product_id` (`product_id`),
  ADD KEY `fk_product_reviews_customer_id` (`customer_id`);

--
-- Indexes for table `Product_Tags`
--
ALTER TABLE `Product_Tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_tags_product_id` (`product_id`);

--
-- Indexes for table `Product_Variants`
--
ALTER TABLE `Product_Variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `relatedProducts`
--
ALTER TABLE `relatedProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `relatedProductId` (`relatedProductId`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `RolePermissions`
--
ALTER TABLE `RolePermissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `roleName` (`roleName`);

--
-- Indexes for table `ShippingAddress`
--
ALTER TABLE `ShippingAddress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `customerId` (`customer_id`);

--
-- Indexes for table `ShippingAddressHistory`
--
ALTER TABLE `ShippingAddressHistory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `customerId` (`customer_id`),
  ADD KEY `orderId` (`order_id`);

--
-- Indexes for table `ShippingClasses`
--
ALTER TABLE `ShippingClasses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Shipping_Classes`
--
ALTER TABLE `Shipping_Classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Stores`
--
ALTER TABLE `Stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tax_Rules`
--
ALTER TABLE `Tax_Rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tax_rules_store_id` (`store_id`),
  ADD KEY `fk_tax_rules_product_id` (`product_id`);

--
-- Indexes for table `Translations`
--
ALTER TABLE `Translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entityId` (`entityId`);

--
-- Indexes for table `UserRoles`
--
ALTER TABLE `UserRoles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`,`roleId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Warehouse`
--
ALTER TABLE `Warehouse`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AuditLogs`
--
ALTER TABLE `AuditLogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Banners`
--
ALTER TABLE `Banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `BulkUploadLogs`
--
ALTER TABLE `BulkUploadLogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Bulk_Upload_Logs`
--
ALTER TABLE `Bulk_Upload_Logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `CartItems`
--
ALTER TABLE `CartItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Discounts`
--
ALTER TABLE `Discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Inventory`
--
ALTER TABLE `Inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MailerConfig`
--
ALTER TABLE `MailerConfig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MailLogs`
--
ALTER TABLE `MailLogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MailTemplates`
--
ALTER TABLE `MailTemplates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Modules`
--
ALTER TABLE `Modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Newsletter`
--
ALTER TABLE `Newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `OrderStatuses`
--
ALTER TABLE `OrderStatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `OrderStatusHistory`
--
ALTER TABLE `OrderStatusHistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `PaymentGateways`
--
ALTER TABLE `PaymentGateways`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PaymentRefunds`
--
ALTER TABLE `PaymentRefunds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ProductAttributes`
--
ALTER TABLE `ProductAttributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ProductMetadata`
--
ALTER TABLE `ProductMetadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ProductReviews`
--
ALTER TABLE `ProductReviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `Product_Images`
--
ALTER TABLE `Product_Images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Product_Pricing_Tiers`
--
ALTER TABLE `Product_Pricing_Tiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product_Reviews`
--
ALTER TABLE `Product_Reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product_Tags`
--
ALTER TABLE `Product_Tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Product_Variants`
--
ALTER TABLE `Product_Variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `relatedProducts`
--
ALTER TABLE `relatedProducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Reviews`
--
ALTER TABLE `Reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `RolePermissions`
--
ALTER TABLE `RolePermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ShippingAddress`
--
ALTER TABLE `ShippingAddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ShippingAddressHistory`
--
ALTER TABLE `ShippingAddressHistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `ShippingClasses`
--
ALTER TABLE `ShippingClasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Shipping_Classes`
--
ALTER TABLE `Shipping_Classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Stores`
--
ALTER TABLE `Stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Tax_Rules`
--
ALTER TABLE `Tax_Rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Translations`
--
ALTER TABLE `Translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserRoles`
--
ALTER TABLE `UserRoles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Warehouse`
--
ALTER TABLE `Warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AuditLogs`
--
ALTER TABLE `AuditLogs`
  ADD CONSTRAINT `AuditLogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `CartItems`
--
ALTER TABLE `CartItems`
  ADD CONSTRAINT `CartItems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `Cart` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `CartItems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `CartItems_ibfk_3` FOREIGN KEY (`variantId`) REFERENCES `ProductVariants` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `Reviews` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comments_ibfk_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `Comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Discounts`
--
ALTER TABLE `Discounts`
  ADD CONSTRAINT `fk_discounts_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_discounts_store_id` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_inventory_variant_id` FOREIGN KEY (`variant_id`) REFERENCES `Product_Variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `MailLogs`
--
ALTER TABLE `MailLogs`
  ADD CONSTRAINT `MailLogs_ibfk_1` FOREIGN KEY (`mailTemplateId`) REFERENCES `MailTemplates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD CONSTRAINT `Notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`shipping_address_history_id`) REFERENCES `ShippingAddressHistory` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `PaymentRefunds`
--
ALTER TABLE `PaymentRefunds`
  ADD CONSTRAINT `PaymentRefunds_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `Payments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `Payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Payments_ibfk_2` FOREIGN KEY (`gateway_id`) REFERENCES `PaymentGateways` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ProductAttributes`
--
ALTER TABLE `ProductAttributes`
  ADD CONSTRAINT `ProductAttributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ProductMetadata`
--
ALTER TABLE `ProductMetadata`
  ADD CONSTRAINT `ProductMetadata_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `fk_store_id` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Product_Images`
--
ALTER TABLE `Product_Images`
  ADD CONSTRAINT `fk_product_image_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Product_Pricing_Tiers`
--
ALTER TABLE `Product_Pricing_Tiers`
  ADD CONSTRAINT `fk_pricing_tiers_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Product_Reviews`
--
ALTER TABLE `Product_Reviews`
  ADD CONSTRAINT `fk_product_reviews_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_product_reviews_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Product_Tags`
--
ALTER TABLE `Product_Tags`
  ADD CONSTRAINT `fk_product_tags_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Product_Variants`
--
ALTER TABLE `Product_Variants`
  ADD CONSTRAINT `Product_Variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

--
-- Constraints for table `relatedProducts`
--
ALTER TABLE `relatedProducts`
  ADD CONSTRAINT `relatedProducts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `relatedProducts_ibfk_2` FOREIGN KEY (`relatedProductId`) REFERENCES `products` (`id`);

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ShippingAddress`
--
ALTER TABLE `ShippingAddress`
  ADD CONSTRAINT `ShippingAddress_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ShippingAddressHistory`
--
ALTER TABLE `ShippingAddressHistory`
  ADD CONSTRAINT `ShippingAddressHistory_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Tax_Rules`
--
ALTER TABLE `Tax_Rules`
  ADD CONSTRAINT `fk_tax_rules_product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_tax_rules_store_id` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Translations`
--
ALTER TABLE `Translations`
  ADD CONSTRAINT `Translations_ibfk_1` FOREIGN KEY (`entityId`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `UserRoles`
--
ALTER TABLE `UserRoles`
  ADD CONSTRAINT `UserRoles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `UserRoles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
