-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mjsb
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `machine_brands`
--
DROP TABLE IF EXISTS `machine_brands`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `machine_brands` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `brand_name` varchar(30) UNIQUE NOT NULL,
    `added_at` date NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_brands`
--
LOCK TABLES `machine_brands` WRITE;

/*!40000 ALTER TABLE `machine_brands` DISABLE KEYS */;

INSERT INTO
  `machine_brands`
VALUES
  (1, 'SINGER', '2024-10-16');

/*!40000 ALTER TABLE `machine_brands` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `machine_buyers`
--
DROP TABLE IF EXISTS `machine_buyers`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `customers` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `machine_id` int (11) NOT NULL,
    `name` varchar(30) NOT NULL,
    `sold_price` int (11) NOT NULL,
    `phone` int (11) NOT NULL,
    `added_at` date NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_machine_buyer` (`machine_id`),
    CONSTRAINT `fk_machine_buyer` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_buyers`
--
LOCK TABLES `machine_buyers` WRITE;

/*!40000 ALTER TABLE `machine_buyers` DISABLE KEYS */;

/*!40000 ALTER TABLE `machine_buyers` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `machine_images`
--
DROP TABLE IF EXISTS `machine_images`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `machine_images` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `machine_id` int (11) NOT NULL,
    `image_path` varchar(30) NOT NULL,
    `added_at` date NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_machine_image` (`machine_id`),
    CONSTRAINT `fk_machine_image` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_images`
--
LOCK TABLES `machine_images` WRITE;

/*!40000 ALTER TABLE `machine_images` DISABLE KEYS */;

/*!40000 ALTER TABLE `machine_images` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `machines`
--
DROP TABLE IF EXISTS `machines`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `machines` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `brand_id` int (11) NOT NULL,
    `model` varchar(30) NOT NULL,
    `bought_price` int (11) DEFAULT NULL,
    `note` text DEFAULT NULL,
    `is_ready` boolean DEFAULT 0,
    `is_working_on` boolean DEFAULT 0,
    `added_at` date NOT NULL DEFAULT current_timestamp(),
    `updated_at` date NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_brand` (`brand_id`),
    CONSTRAINT `machines_machine_brands_FK` FOREIGN KEY (`brand_id`) REFERENCES `machine_brands` (`id`) ON DELETE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machines`
--
LOCK TABLES `machines` WRITE;

/*!40000 ALTER TABLE `machines` DISABLE KEYS */;

/*!40000 ALTER TABLE `machines` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Dumping routines for database 'mjsb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-27  0:40:56