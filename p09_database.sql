-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: p09_agroconnectdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appliedscheme`
--

DROP TABLE IF EXISTS `appliedscheme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appliedscheme` (
  `aid` int NOT NULL,
  `gid` int NOT NULL,
  `fid` int NOT NULL,
  `status` tinyint NOT NULL,
  `schemeid` int NOT NULL,
  PRIMARY KEY (`aid`),
  KEY `fkfidapplied_idx` (`fid`),
  KEY `fkgidapplied_idx` (`gid`),
  KEY `fk_scheme_idx` (`schemeid`),
  CONSTRAINT `fk_scheme` FOREIGN KEY (`schemeid`) REFERENCES `schemes` (`schemeid`) ON DELETE CASCADE,
  CONSTRAINT `fkfidapplied` FOREIGN KEY (`fid`) REFERENCES `farmer` (`fid`),
  CONSTRAINT `fkgidapplied` FOREIGN KEY (`gid`) REFERENCES `government` (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliedscheme`
--

LOCK TABLES `appliedscheme` WRITE;
/*!40000 ALTER TABLE `appliedscheme` DISABLE KEYS */;
/*!40000 ALTER TABLE `appliedscheme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankaccount` (
  `accid` int NOT NULL AUTO_INCREMENT,
  `accno` varchar(45) NOT NULL,
  `bankname` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `ifsccode` varchar(45) NOT NULL,
  PRIMARY KEY (`accid`),
  UNIQUE KEY `accno` (`accno`),
  UNIQUE KEY `accid_UNIQUE` (`accid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
INSERT INTO `bankaccount` VALUES (1,'1234567890','SBI','Nagpur Branch','SBIN0001234'),(2,'2345678901','HDFC','Pune Branch','HDFC0005678');
/*!40000 ALTER TABLE `bankaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `bid` int NOT NULL AUTO_INCREMENT,
  `bname` varchar(65) NOT NULL,
  `cid` int NOT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE KEY `bid_UNIQUE` (`bid`),
  UNIQUE KEY `bname_UNIQUE` (`bname`),
  KEY `cidfk_brand_idx` (`cid`),
  CONSTRAINT `cidfk_brand` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (31,'SeedPlus',4),(32,'AgroGrow Seeds',4),(33,'GreenHarvest',4),(34,'BioCrop Fertilizers',5),(35,'NutriFarm',5),(36,'FertileField',5),(37,'ToolMaster',6),(38,'AgriTools Co.',6),(39,'FarmTech Machines',6),(40,'CropAid Equipment',6);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `fid` int NOT NULL,
  `quantity` int DEFAULT '1',
  `duration_days` int DEFAULT NULL,
  `pvid` int DEFAULT NULL,
  `prorid` int DEFAULT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `price` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`cartid`),
  KEY `product_vendor_idx` (`pvid`),
  KEY `product_rental_idx` (`prorid`),
  KEY `farmer_id_idx` (`fid`),
  CONSTRAINT `farmer_id` FOREIGN KEY (`fid`) REFERENCES `farmer` (`fid`) ON DELETE CASCADE,
  CONSTRAINT `product_rental` FOREIGN KEY (`prorid`) REFERENCES `productrental` (`prorid`) ON DELETE CASCADE,
  CONSTRAINT `product_vendor` FOREIGN KEY (`pvid`) REFERENCES `productvendor` (`pvid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(45) NOT NULL,
  `ctype` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cid_UNIQUE` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (4,'Seeds','seeds','All types of crop seeds available'),(5,'Fertilizers','fertilizers','Organic and chemical fertilizers'),(6,'Farming Tools','machines','Equipmencategoryt and machines for rent');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmer`
--

DROP TABLE IF EXISTS `farmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmer` (
  `fid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `landsize` double NOT NULL,
  `income` double NOT NULL,
  `locid` int NOT NULL,
  PRIMARY KEY (`fid`),
  UNIQUE KEY `fid_UNIQUE` (`fid`),
  KEY `uid_idx` (`uid`),
  KEY `flocid_idx` (`locid`),
  CONSTRAINT `flocid` FOREIGN KEY (`locid`) REFERENCES `location` (`locid`) ON DELETE CASCADE,
  CONSTRAINT `fuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer`
--

LOCK TABLES `farmer` WRITE;
/*!40000 ALTER TABLE `farmer` DISABLE KEYS */;
INSERT INTO `farmer` VALUES (1,14,5,50000,6),(4,29,2.5,25000,3);
/*!40000 ALTER TABLE `farmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `vid` int NOT NULL,
  `message` text,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`feedid`),
  KEY `user_id_idx` (`uid`),
  KEY `vid_id_idx` (`vid`),
  CONSTRAINT `fuserid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `fvid` FOREIGN KEY (`vid`) REFERENCES `vendors` (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `government`
--

DROP TABLE IF EXISTS `government`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `government` (
  `gid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `empno` int NOT NULL,
  `deptname` varchar(45) NOT NULL,
  `designation` varchar(45) NOT NULL,
  PRIMARY KEY (`gid`),
  UNIQUE KEY `gid_UNIQUE` (`gid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `guserid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `government`
--

LOCK TABLES `government` WRITE;
/*!40000 ALTER TABLE `government` DISABLE KEYS */;
INSERT INTO `government` VALUES (4,23,7654,'Agriculture','Officer'),(5,24,799,'Agriculture','Officer'),(6,25,456,'Agriculture','Clerk'),(7,31,524,'Agriculture','Clerk');
/*!40000 ALTER TABLE `government` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `locid` int NOT NULL AUTO_INCREMENT,
  `locname` varchar(45) NOT NULL,
  PRIMARY KEY (`locid`),
  UNIQUE KEY `locid_UNIQUE` (`locid`),
  UNIQUE KEY `locname_UNIQUE` (`locname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (4,'Kolhapur'),(6,'latur'),(3,'Mumbai'),(1,'Nagpur'),(2,'Pune'),(5,'wardha');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderdetailid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `pvid` int DEFAULT NULL,
  `prorid` int DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `durationdays` int DEFAULT NULL,
  `priceperunit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `vid` int DEFAULT NULL,
  `price` decimal(8,2) DEFAULT '0.00',
  PRIMARY KEY (`orderdetailid`),
  KEY `product_vendor_idx` (`pvid`),
  KEY `product_rental_idx` (`prorid`),
  KEY `product_vendorid_agro_idx` (`pvid`),
  KEY `vendor_agro_idx` (`vid`),
  KEY `orderdetails_ibfk_1` (`orderid`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `ordermaster` (`orderid`) ON DELETE CASCADE,
  CONSTRAINT `product_rental_agro` FOREIGN KEY (`prorid`) REFERENCES `productrental` (`prorid`) ON DELETE CASCADE,
  CONSTRAINT `product_vendorid_agro` FOREIGN KEY (`pvid`) REFERENCES `productvendor` (`pvid`) ON DELETE CASCADE,
  CONSTRAINT `vendor_agro` FOREIGN KEY (`vid`) REFERENCES `vendors` (`vid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (108,39,15,NULL,3,NULL,999.00,2997.00,3,999.00),(109,40,10,NULL,1,NULL,8000.00,8000.00,2,8000.00),(110,40,15,NULL,1,NULL,999.00,999.00,3,999.00),(111,41,15,NULL,1,NULL,999.00,999.00,3,999.00),(112,41,16,NULL,1,NULL,200.00,200.00,3,200.00),(113,41,19,NULL,1,NULL,500.00,500.00,3,500.00);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordermaster`
--

DROP TABLE IF EXISTS `ordermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordermaster` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `fid` int NOT NULL,
  `orderdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `totalamount` decimal(10,2) NOT NULL,
  `paymentstatus` varchar(20) DEFAULT 'Pending',
  `paymentmethod` varchar(20) DEFAULT NULL,
  `shippingaddress` text,
  PRIMARY KEY (`orderid`),
  KEY `fid_fk_agro_idx` (`fid`),
  CONSTRAINT `fid_fk_agro` FOREIGN KEY (`fid`) REFERENCES `farmer` (`fid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordermaster`
--

LOCK TABLES `ordermaster` WRITE;
/*!40000 ALTER TABLE `ordermaster` DISABLE KEYS */;
INSERT INTO `ordermaster` VALUES (39,4,'2025-08-10 00:00:00',2997.00,'PAID','CASH_ON_DELIVERY','Gokhale Nagar, Pune'),(40,1,'2025-08-11 00:00:00',8999.00,'PAID','CASH_ON_DELIVERY','gohale nagar pune'),(41,1,'2025-08-11 00:00:00',1699.00,'PAID','CASH_ON_DELIVERY','pp');
/*!40000 ALTER TABLE `ordermaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` varchar(20) NOT NULL DEFAULT 'UPI',
  `paymentstatus` varchar(20) DEFAULT 'Pending',
  `transaction_id` varchar(50) DEFAULT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`paymentid`),
  KEY `orderid` (`orderid`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `ordermaster` (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (15,39,2997.00,'DEBIT_CARD','Completed','9887794b-96e3-4332-b6e9-4f97daaaee15','2025-08-11 00:00:00'),(16,40,8999.00,'CREDIT_CARD','Completed','6123ecc5-91fb-4733-9fe9-17f3ce7c6fa4','2025-08-11 00:00:00'),(17,41,1699.00,'CASH_ON_DELIVERY','Completed','ee331905-28b1-440f-b13e-5d7b17ffd8fc','2025-08-11 00:00:00');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `prodid` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL,
  `pname` varchar(100) NOT NULL,
  `pdescription` text,
  `bid` int NOT NULL,
  PRIMARY KEY (`prodid`),
  KEY `pcid` (`cid`),
  KEY `product_bidfk_idx` (`bid`),
  CONSTRAINT `product_bid` FOREIGN KEY (`bid`) REFERENCES `brands` (`bid`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (25,4,'Hybrid Maize Seeds','High-yield maize seeds ideal for summer and rainy seasons',31),(26,4,'Organic Wheat Seeds','Non-GMO, organic wheat seeds with excellent germination',32),(27,4,'Paddy Seeds','Short-duration paddy seeds for faster harvest',33),(28,5,'Urea Granules','Nitrogen-rich fertilizer for quick growth in crops',34),(29,5,'Organic Compost','Natural compost suitable for vegetable and fruit farming',35),(30,5,'Potash Fertilizer','Boosts root strength and disease resistance',36),(31,6,'Mini Power Tiller','Compact and efficient tiller for small farms',37),(32,6,'Battery Sprayer','Portable battery-operated sprayer for pesticides and fertilizers',38),(33,6,'Drip Irrigation Kit','Complete kit for water-efficient crop irrigation',39),(35,4,'Anuja Seeds','These are world famous seeds.',32),(36,5,'Round up','It will kill grass',35);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productrental`
--

DROP TABLE IF EXISTS `productrental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productrental` (
  `prorid` int NOT NULL AUTO_INCREMENT,
  `prodid` int NOT NULL,
  `vid` int NOT NULL,
  `rateperday` decimal(10,0) NOT NULL,
  PRIMARY KEY (`prorid`),
  KEY `fk_prodid_pr_idx` (`prodid`),
  KEY `fk_vid_pr_idx` (`vid`),
  CONSTRAINT `fk_prodid_pr` FOREIGN KEY (`prodid`) REFERENCES `product` (`prodid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vid_pr` FOREIGN KEY (`vid`) REFERENCES `vendors` (`vid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productrental`
--

LOCK TABLES `productrental` WRITE;
/*!40000 ALTER TABLE `productrental` DISABLE KEYS */;
INSERT INTO `productrental` VALUES (9,33,2,900),(11,32,3,1199),(12,31,3,1000);
/*!40000 ALTER TABLE `productrental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productvendor`
--

DROP TABLE IF EXISTS `productvendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productvendor` (
  `pvid` int NOT NULL AUTO_INCREMENT,
  `prodid` int NOT NULL,
  `vid` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`pvid`),
  KEY `pvprodid_idx` (`prodid`),
  KEY `pvvid_idx` (`vid`),
  CONSTRAINT `pvprodid` FOREIGN KEY (`prodid`) REFERENCES `product` (`prodid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pvvid` FOREIGN KEY (`vid`) REFERENCES `vendors` (`vid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvendor`
--

LOCK TABLES `productvendor` WRITE;
/*!40000 ALTER TABLE `productvendor` DISABLE KEYS */;
INSERT INTO `productvendor` VALUES (10,28,2,8000.00),(14,25,3,1500.00),(15,28,3,999.00),(16,28,3,200.00),(17,26,3,800.00),(18,27,3,700.00),(19,25,3,500.00);
/*!40000 ALTER TABLE `productvendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(100) NOT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `rname_UNIQUE` (`rname`),
  UNIQUE KEY `rid_UNIQUE` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (4,'Admin'),(1,'Farmer'),(3,'Government'),(2,'Vendor');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schemes`
--

DROP TABLE IF EXISTS `schemes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schemes` (
  `schemeid` int NOT NULL AUTO_INCREMENT,
  `schemename` varchar(45) NOT NULL,
  `startdate` date NOT NULL,
  `lastdate` date NOT NULL,
  `eligibility` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `gid` int NOT NULL,
  `income` double NOT NULL,
  `landsize` double NOT NULL,
  PRIMARY KEY (`schemeid`),
  UNIQUE KEY `schemeid_UNIQUE` (`schemeid`),
  KEY `gov_id_idx` (`gid`),
  CONSTRAINT `fk_scheme_government` FOREIGN KEY (`gid`) REFERENCES `government` (`gid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schemes`
--

LOCK TABLES `schemes` WRITE;
/*!40000 ALTER TABLE `schemes` DISABLE KEYS */;
INSERT INTO `schemes` VALUES (9,'Organic Farming Promotion','2025-07-25','2025-08-25','Registered farmers practicing chemical-free farming','Encourages organic farming practices through financial assistance and training programs.',6,30000,5),(11,'Kisan Credit Card Scheme','2025-08-11','2025-08-20','All active farmers above 18 years...','Provides credit to farmers for crop production and equipment purchase.',4,50000,10),(12,'Organic Farming Subsidy','2025-08-01','2025-08-30','Farmers owning less than 5 acres of land','Government provides a 40% subsidy on organic fertilizers and seeds.',4,25000,5),(13,'Drip Irrigation Assistance','2025-08-01','2025-08-10','All registered farmers','Assistance for installation of drip irrigation systems.',4,50000,7),(15,'Agriculture Support Scheme','2025-09-01','2025-12-31','Resident farmers with land size > 1 acre','Financial aid and equipment support for eligible farmers',4,50000,2.5);
/*!40000 ALTER TABLE `schemes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rid` int NOT NULL,
  `mobileno` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'johnwick','John@123',1,'9874561252','johnwick@gmail.com','John','Wick',1),(14,'ombiradar','Om123',1,'9874565412','om@gmail.com','Om','Biradar',1),(15,'viratkohli','anushka',2,'789941616','vk@gmail.com','Virat','Kohli',1),(23,'sachint','Sachin@123',3,'9874563217','sachin@gmail.com','Sachin','Tendulkar',1),(24,'onkarrathod','Onkar@123',3,'9874563214','onkar@gmail.com','onkar','rathod',1),(25,'msdhoni','MS@123',3,'8996123134','msd@gmail.com','MS','Dhoni',1),(26,'admin','Admin@123',4,'989464631','admin@gmail.com','Admin','Admin',1),(27,'utkarsh','utkarsh@123',2,'9874563102','patankarutkarsh@gmail.com','utkarsh','Patankar',1),(28,'krishraje','Krish@123',2,'7894561230','raje@123gmail.com','krishna','raje',1),(29,'jennifer','Jenni@123',1,'8974561320','jennifer@gmail.com','Jennifer','Jane',1),(30,'sainaik@gmail.com','Sai@123',3,'9874532148','sai@gmail.com','sai','naik',1),(31,'nikhilrathod','Mikhil@123',3,'9874563215','nikhil@gmail.com','nikhil','rathod',1),(32,'rohitsharma','Rohit@123',3,'7565841238','rohit@gmail.com','Rohit','Sharma',1),(36,'suyogshukla','Suyog@123',3,'7896541235','suyog@gmail.com','Suyog','Shukla',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `liscenceno` varchar(45) NOT NULL,
  `companyname` varchar(45) NOT NULL,
  PRIMARY KEY (`vid`),
  UNIQUE KEY `vid_UNIQUE` (`vid`),
  UNIQUE KEY `liscenceno_UNIQUE` (`liscenceno`),
  KEY `vuid_idx` (`uid`),
  CONSTRAINT `vuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (2,27,'4568','Agrostar'),(3,28,'7788','agro sahaya pvt ltd');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-11 11:26:59
