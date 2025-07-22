-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: p09_agrosupportdb
-- ------------------------------------------------------
-- Server version	8.0.31

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

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS p09_agroconnectdb;

-- Select the database to work with
USE p09_agroconnectdb;
--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankaccount` (
  `accid` int NOT NULL AUTO_INCREMENT,
 `accno` varchar(45) NOT NULL UNIQUE,
  `bankname` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `ifsccode` varchar(45) NOT NULL,
  PRIMARY KEY (`accid`),
  UNIQUE KEY `accid_UNIQUE` (`accid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
   `pvid` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cartid`),
  KEY `pvid` (`pvid`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`pvid`) REFERENCES `productvendor` (`pvid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
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
  `accid` int NOT NULL,
  `uid` int DEFAULT NULL,
  `landsize` int NOT NULL,
  `income` decimal(8,2) NOT NULL,
  `locid` int NOT NULL,
  PRIMARY KEY (`fid`),
  UNIQUE KEY `fid_UNIQUE` (`fid`),
  KEY `uid_idx` (`uid`),
  KEY `accid_idx` (`accid`),
  KEY `flocid_idx` (`locid`),
  CONSTRAINT `accid` FOREIGN KEY (`accid`) REFERENCES `bankaccount` (`accid`),
  CONSTRAINT `flocid` FOREIGN KEY (`locid`) REFERENCES `location` (`locid`),
 CONSTRAINT `fuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer`
--

LOCK TABLES `farmer` WRITE;
/*!40000 ALTER TABLE `farmer` DISABLE KEYS */;
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
  `schemeid` int NOT NULL,
  `empno` int NOT NULL,
  `deptname` varchar(45) NOT NULL,
  `designation` varchar(45) NOT NULL,
  PRIMARY KEY (`gid`),
  UNIQUE KEY `gid_UNIQUE` (`gid`),
  KEY `uid_idx` (`uid`),
  KEY `schemeid_idx` (`schemeid`),
  CONSTRAINT `gschemeid` FOREIGN KEY (`schemeid`) REFERENCES `schemes` (`schemeid`),
  CONSTRAINT `guserid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `government`
--

LOCK TABLES `government` WRITE;
/*!40000 ALTER TABLE `government` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `fid` int NOT NULL,
  `cartid` int NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `orderdate` date DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `ocartid_idx` (`cartid`),
  CONSTRAINT `ocartid` FOREIGN KEY (`cartid`) REFERENCES `cart` (`cartid`),
  CONSTRAINT `ofid` FOREIGN KEY (`fid`) REFERENCES `farmer` (`fid`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payid` int NOT NULL AUTO_INCREMENT,
  `paydate` date DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `oid` int NOT NULL,
  PRIMARY KEY (`payid`),
  KEY `poid_idx` (`oid`),
  CONSTRAINT `poid` FOREIGN KEY (`oid`) REFERENCES `orders` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
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
   PRIMARY KEY (`prodid`),
  KEY `pcid` (`cid`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
  CONSTRAINT `pvprodid` FOREIGN KEY (`prodid`) REFERENCES `product` (`prodid`),
  CONSTRAINT `pvvid` FOREIGN KEY (`vid`) REFERENCES `vendors` (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvendor`
--

LOCK TABLES `productvendor` WRITE;
/*!40000 ALTER TABLE `productvendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `productvendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentalsp`
--

DROP TABLE IF EXISTS `rentalsp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentalsp` (
  `prid` int NOT NULL AUTO_INCREMENT,
  `oid` int NOT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `duration` int NOT NULL,
  `rentperday` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`prid`),
  CONSTRAINT `proid` FOREIGN KEY (`oid`) REFERENCES `orders` (`oid`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentalsp`
--

LOCK TABLES `rentalsp` WRITE;
/*!40000 ALTER TABLE `rentalsp` DISABLE KEYS */;
/*!40000 ALTER TABLE `rentalsp` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
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
  PRIMARY KEY (`schemeid`),
  UNIQUE KEY `schemeid_UNIQUE` (`schemeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schemes`
--

LOCK TABLES `schemes` WRITE;
/*!40000 ALTER TABLE `schemes` DISABLE KEYS */;
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
  `contact` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `mname` varchar(45),
  `lname` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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
  `accid` int NOT NULL,
  `liscenceno` varchar(45) NOT NULL,
  `companyname` varchar(45) NOT NULL,
  `cid` int NOT NULL,
  PRIMARY KEY (`vid`),
  UNIQUE KEY `vid_UNIQUE` (`vid`),
  UNIQUE KEY `liscenceno_UNIQUE` (`liscenceno`),
  KEY `vuid_idx` (`uid`),
  KEY `vaccid_idx` (`accid`),
  CONSTRAINT `vaccid` FOREIGN KEY (`accid`) REFERENCES `bankaccount` (`accid`),
  CONSTRAINT `vuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `vcid` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
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

-- Dump completed on 2025-07-02 17:53:57
