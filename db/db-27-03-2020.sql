-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdministrador` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(70) NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1020,'Nicolas Tellez','direccion','nicolas12456@hotmail.com','$2a$07$sMRFGYQ447fxrhiLTuEk0ui7rpKnBuWSLdkwMz4DC6tP5Qlfl0V06');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bodega`
--

DROP TABLE IF EXISTS `bodega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodega` (
  `idBodega` int(11) NOT NULL AUTO_INCREMENT,
  `estante` varchar(10) NOT NULL,
  PRIMARY KEY (`idBodega`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodega`
--

LOCK TABLES `bodega` WRITE;
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT INTO `bodega` VALUES (1,'A1'),(2,'A2'),(3,'B1'),(4,'B2');
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `idCiudad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Bogotá'),(2,'Cali'),(3,'Medellín'),(4,'Barranquilla');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `FK_idCiudad` int(11) NOT NULL,
  `FK_idRuta` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(70) NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_idCiudad` (`FK_idCiudad`),
  KEY `FK_idRuta` (`FK_idRuta`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`FK_idCiudad`) REFERENCES `ciudad` (`idCiudad`),
  CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`FK_idRuta`) REFERENCES `ruta` (`idRuta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (102154,'Nicolas Tellez','Cll 142C',1,5,'prueba@gmail.com','$2a$07$eBh3HIIsAeg1bBN28JClJuhkWfAoI4nFcyygtgAQElKAAFHdRhSPq');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `clientescxruta`
--

DROP TABLE IF EXISTS `clientescxruta`;
/*!50001 DROP VIEW IF EXISTS `clientescxruta`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `clientescxruta` AS SELECT 
 1 AS `idCliente`,
 1 AS `nc`,
 1 AS `direccion`,
 1 AS `idRuta`,
 1 AS `nombre`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `conductor`
--

DROP TABLE IF EXISTS `conductor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conductor` (
  `idConductor` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `fechaIngresoEmpresa` date NOT NULL,
  PRIMARY KEY (`idConductor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conductor`
--

LOCK TABLES `conductor` WRITE;
/*!40000 ALTER TABLE `conductor` DISABLE KEYS */;
INSERT INTO `conductor` VALUES (102629,'Nicolas Tellez','calle 8a','2020-02-25'),(654564,'Gloria Ramirez','calle 55 a ','2020-02-28'),(52193152,'Gloria Ramirez','calle 55 a sur # 78j-41','2020-02-22'),(100123654,'Santiago Gonzalez','Cll 142','2020-03-14'),(1001091648,'Santiago Gonzalez','Cll 142','2020-03-14'),(6545645364,'Mateo dsdsryt','calle 55 a sur','2020-02-22');
/*!40000 ALTER TABLE `conductor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `conductoresarutas`
--

DROP TABLE IF EXISTS `conductoresarutas`;
/*!50001 DROP VIEW IF EXISTS `conductoresarutas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `conductoresarutas` AS SELECT 
 1 AS `idConductor`,
 1 AS `cn`,
 1 AS `idRuta`,
 1 AS `nombre`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `conductorruta`
--

DROP TABLE IF EXISTS `conductorruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conductorruta` (
  `idConductorRuta` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `FK_idConductor` bigint(20) NOT NULL,
  `FK_idRuta` int(11) NOT NULL,
  PRIMARY KEY (`idConductorRuta`),
  KEY `FK_idConductor` (`FK_idConductor`),
  KEY `FK_idRuta` (`FK_idRuta`),
  CONSTRAINT `conductorruta_ibfk_1` FOREIGN KEY (`FK_idConductor`) REFERENCES `conductor` (`idConductor`),
  CONSTRAINT `conductorruta_ibfk_2` FOREIGN KEY (`FK_idRuta`) REFERENCES `ruta` (`idRuta`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conductorruta`
--

LOCK TABLES `conductorruta` WRITE;
/*!40000 ALTER TABLE `conductorruta` DISABLE KEYS */;
INSERT INTO `conductorruta` VALUES (1,'2020-02-29','2020-07-31',52193152,5),(2,'2020-02-29','2020-06-26',6545645364,6),(3,'2020-02-27','2020-08-05',102629,4),(5,'2020-02-14','2020-02-27',654564,6),(6,'2020-03-14','2020-03-16',1001091648,5),(7,'2020-03-14','2020-03-16',100123654,4);
/*!40000 ALTER TABLE `conductorruta` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `duracionRuta` BEFORE INSERT ON `conductorruta` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := calc_fechas(NEW.fechaInicio, NEW.fechaFin);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: fecha de inicio no puede ser mayor a la fecha fin';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `costo`
--

DROP TABLE IF EXISTS `costo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `costo` (
  `idCosto` int(11) NOT NULL AUTO_INCREMENT,
  `costo` decimal(15,2) NOT NULL,
  `fechaCosto` date NOT NULL,
  `FK_idRuta` int(11) NOT NULL,
  PRIMARY KEY (`idCosto`),
  KEY `FK_idRuta` (`FK_idRuta`),
  CONSTRAINT `costo_ibfk_1` FOREIGN KEY (`FK_idRuta`) REFERENCES `ruta` (`idRuta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costo`
--

LOCK TABLES `costo` WRITE;
/*!40000 ALTER TABLE `costo` DISABLE KEYS */;
INSERT INTO `costo` VALUES (1,46546.00,'2020-02-11',17),(2,46546.00,'2020-02-28',20),(3,5000.00,'2020-03-14',22),(4,1500.00,'2020-03-14',23),(5,5000.00,'2020-03-15',5);
/*!40000 ALTER TABLE `costo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validarCosto` BEFORE INSERT ON `costo` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := valorProducto(NEW.costo);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: el valor del costo debe ser mayor a $0 y menor a $10.000.000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `idMarca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'reeebok'),(2,'Nike'),(3,'Adidad'),(4,'Puma');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `fechaEntrega` date NOT NULL,
  `fechaPedido` date NOT NULL,
  `FK_idCliente` bigint(20) NOT NULL,
  `FK_idConductorRuta` int(11) NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `FK_idCliente` (`FK_idCliente`),
  KEY `FK_idConductorRuta` (`FK_idConductorRuta`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`FK_idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`FK_idConductorRuta`) REFERENCES `conductorruta` (`idConductorRuta`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (52,'2020-03-31','2020-03-24',102154,1),(53,'2020-03-31','2020-03-24',102154,1),(54,'2020-03-31','2020-03-24',102154,1),(56,'2020-03-28','2020-03-24',102154,1),(59,'2020-03-28','2020-03-24',102154,1),(61,'2020-03-30','2020-03-26',102154,1),(62,'2020-03-30','2020-03-26',102154,1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fechasPedido` BEFORE INSERT ON `pedido` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := calc_fechas(NEW.fechaPedido, NEW.fechaEntrega);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: fecha de pedido no puede ser mayor a la fecha de entrega';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `idPermiso` bigint(20) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisoadministrador`
--

DROP TABLE IF EXISTS `permisoadministrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisoadministrador` (
  `FK_idAdministrador` bigint(20) NOT NULL,
  PRIMARY KEY (`FK_idAdministrador`),
  CONSTRAINT `permisoadministrador_ibfk_1` FOREIGN KEY (`FK_idAdministrador`) REFERENCES `administrador` (`idAdministrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisoadministrador`
--

LOCK TABLES `permisoadministrador` WRITE;
/*!40000 ALTER TABLE `permisoadministrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisoadministrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisocliente`
--

DROP TABLE IF EXISTS `permisocliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisocliente` (
  `FK_idCliente` bigint(20) NOT NULL,
  PRIMARY KEY (`FK_idCliente`),
  CONSTRAINT `permisocliente_ibfk_1` FOREIGN KEY (`FK_idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisocliente`
--

LOCK TABLES `permisocliente` WRITE;
/*!40000 ALTER TABLE `permisocliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisocliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `valorUnidad` decimal(15,2) NOT NULL,
  `urlImage` varchar(100) NOT NULL,
  `FK_idMarca` int(11) NOT NULL,
  `FK_idBodega` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `FK_idMarca` (`FK_idMarca`),
  KEY `FK_idBodega` (`FK_idBodega`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`FK_idMarca`) REFERENCES `marca` (`idMarca`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`FK_idBodega`) REFERENCES `bodega` (`idBodega`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'arrozghjkl',52005.00,'3186624405998_beetle-34372_1280.png',1,2),(2,'Mateo dsds',654654.00,'9621069066879_cup-48500_1280.png',4,2);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validarValorProducto` BEFORE INSERT ON `producto` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := valorProducto(NEW.valorUnidad);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: el valor del producto debe ser mayor a $0 y menor a $10.000.000';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `productopedido`
--

DROP TABLE IF EXISTS `productopedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productopedido` (
  `FK_idPedido` int(11) NOT NULL,
  `FK_idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`FK_idPedido`,`FK_idProducto`),
  KEY `FK_idProducto` (`FK_idProducto`),
  CONSTRAINT `productopedido_ibfk_1` FOREIGN KEY (`FK_idPedido`) REFERENCES `pedido` (`idPedido`),
  CONSTRAINT `productopedido_ibfk_2` FOREIGN KEY (`FK_idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productopedido`
--

LOCK TABLES `productopedido` WRITE;
/*!40000 ALTER TABLE `productopedido` DISABLE KEYS */;
INSERT INTO `productopedido` VALUES (52,1,2),(52,2,2),(59,1,3),(59,2,123),(61,1,1),(62,1,1);
/*!40000 ALTER TABLE `productopedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `checkStock_t` BEFORE INSERT ON `productopedido` FOR EACH ROW BEGIN
CALL checkStock_p(NEW.FK_idProducto, NEW.Cantidad);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validarCantidad_prodpedido` BEFORE INSERT ON `productopedido` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := valorProducto(NEW.cantidad);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: la cantidad de producto debe ser mayor a 0 und y menor a 10.000.000 und';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `personaContacto` varchar(50) NOT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Alpina','calle 55 a sur #78j-41','Mateo Epalza'),(2,'Yogurt','Calle142C','Nicolas Tellez');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedorproducto`
--

DROP TABLE IF EXISTS `proveedorproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedorproducto` (
  `idProveedorProducto` int(11) NOT NULL AUTO_INCREMENT,
  `FK_idProveedor` int(11) NOT NULL,
  `FK_idProducto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`idProveedorProducto`),
  KEY `FK_idProveedor` (`FK_idProveedor`),
  KEY `FK_idProducto` (`FK_idProducto`),
  CONSTRAINT `proveedorproducto_ibfk_1` FOREIGN KEY (`FK_idProveedor`) REFERENCES `proveedor` (`idProveedor`),
  CONSTRAINT `proveedorproducto_ibfk_2` FOREIGN KEY (`FK_idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedorproducto`
--

LOCK TABLES `proveedorproducto` WRITE;
/*!40000 ALTER TABLE `proveedorproducto` DISABLE KEYS */;
INSERT INTO `proveedorproducto` VALUES (4,1,2,'2020-03-27',125),(5,1,1,'2020-03-26',125),(11,2,1,'2020-03-14',150),(12,2,1,'2020-03-14',10);
/*!40000 ALTER TABLE `proveedorproducto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validarCantidad_proveprod` BEFORE INSERT ON `proveedorproducto` FOR EACH ROW BEGIN 
declare result varchar(5);
SET result := valorProducto(NEW.cantidad);
IF (result='true') then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: la cantidad de producto debe ser mayor a 0 und y menor a 10.000.000 und';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ruta`
--

DROP TABLE IF EXISTS `ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruta` (
  `idRuta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaApertura` date NOT NULL,
  `FK_idCiudadOrigen` int(11) NOT NULL DEFAULT '1',
  `FK_idCiudadDestino` int(11) NOT NULL,
  PRIMARY KEY (`idRuta`),
  KEY `FK_idCiudadOrigen` (`FK_idCiudadOrigen`),
  KEY `FK_idCiudadDestino` (`FK_idCiudadDestino`),
  CONSTRAINT `ruta_ibfk_1` FOREIGN KEY (`FK_idCiudadOrigen`) REFERENCES `ciudad` (`idCiudad`),
  CONSTRAINT `ruta_ibfk_2` FOREIGN KEY (`FK_idCiudadDestino`) REFERENCES `ciudad` (`idCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta`
--

LOCK TABLES `ruta` WRITE;
/*!40000 ALTER TABLE `ruta` DISABLE KEYS */;
INSERT INTO `ruta` VALUES (4,'Bogota-Cali','2020-03-14',1,2),(5,'Bogota-Medellin','2019-05-22',1,3),(6,'Bogota-Barranquilla','2017-11-27',1,4),(17,'bog-barra','2020-02-23',1,4),(19,'Mateo dsdsryt','2020-02-28',1,3),(20,'Mateo Epalza','2020-02-28',1,3),(22,'Bogota-hola','2020-03-14',1,1),(23,'Expressasdwa','2020-03-14',1,1);
/*!40000 ALTER TABLE `ruta` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validarCiudadRuta` BEFORE INSERT ON `ruta` FOR EACH ROW BEGIN 
IF (NEW.FK_idCiudadOrigen=NEW.FK_idCiudadDestino) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: la ciudad de destino no puede ser la misma ciudad de origen';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Nz2eaJ-ntpTnshltfU1BndkUAI7Klcts',1585372232,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"proCom\":[],\"passport\":{\"user\":102154}}'),('lCQVKhgGCIObAX3WKpr3ZNRChT_12AO4',1585407553,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"proCom\":[],\"passport\":{\"user\":102154}}'),('v6GflO8tCcLHnZ3xpXQvmBpgCMq0EwtV',1585407883,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"proCom\":[[1,1]],\"passport\":{\"user\":1020}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonocliente`
--

DROP TABLE IF EXISTS `telefonocliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonocliente` (
  `FK_idCliente` bigint(20) NOT NULL,
  `telefono` int(11) NOT NULL,
  PRIMARY KEY (`FK_idCliente`,`telefono`),
  CONSTRAINT `telefonocliente_ibfk_1` FOREIGN KEY (`FK_idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonocliente`
--

LOCK TABLES `telefonocliente` WRITE;
/*!40000 ALTER TABLE `telefonocliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefonocliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonoconductor`
--

DROP TABLE IF EXISTS `telefonoconductor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonoconductor` (
  `FK_idConductor` bigint(20) NOT NULL,
  `telefono` int(11) NOT NULL,
  PRIMARY KEY (`FK_idConductor`,`telefono`),
  CONSTRAINT `telefonoconductor_ibfk_1` FOREIGN KEY (`FK_idConductor`) REFERENCES `conductor` (`idConductor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonoconductor`
--

LOCK TABLES `telefonoconductor` WRITE;
/*!40000 ALTER TABLE `telefonoconductor` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefonoconductor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonoproveedor`
--

DROP TABLE IF EXISTS `telefonoproveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonoproveedor` (
  `FK_idProveedor` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  PRIMARY KEY (`FK_idProveedor`,`telefono`),
  CONSTRAINT `telefonoproveedor_ibfk_1` FOREIGN KEY (`FK_idProveedor`) REFERENCES `proveedor` (`idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonoproveedor`
--

LOCK TABLES `telefonoproveedor` WRITE;
/*!40000 ALTER TABLE `telefonoproveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefonoproveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ventasxciudad`
--

DROP TABLE IF EXISTS `ventasxciudad`;
/*!50001 DROP VIEW IF EXISTS `ventasxciudad`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ventasxciudad` AS SELECT 
 1 AS `idCiudad`,
 1 AS `nombre`,
 1 AS `CiudadP`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ventasxcliente`
--

DROP TABLE IF EXISTS `ventasxcliente`;
/*!50001 DROP VIEW IF EXISTS `ventasxcliente`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ventasxcliente` AS SELECT 
 1 AS `idcliente`,
 1 AS `nombre`,
 1 AS `direccion`,
 1 AS `CP`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'proyecto'
--
/*!50003 DROP FUNCTION IF EXISTS `calc_fechas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `calc_fechas`(fecha1 date,fecha2 date) RETURNS varchar(5) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
declare result varchar(5);
IF(fecha1 > fecha2) THEN
SET result='true';
ELSE
SET result='false';
END IF;
RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `valorProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `valorProducto`(precio decimal(15,2)) RETURNS varchar(5) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
declare result varchar(5);
IF(precio<0 or precio>10000000) THEN
SET result=true;
ELSE
SET result='false';
END IF;
RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkStock_p` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkStock_p`(idProducto INT, newCant INT)
BEGIN
DECLARE cantStock INT;
DECLARE cantOut INT;
DECLARE realStock INT;
DECLARE message varchar(255);

SELECT sum(cantidad) 
INTO cantStock
FROM proveedorproducto 
WHERE FK_idProducto = idProducto;

SELECT sum(cantidad)
INTO cantOut
FROM productopedido
WHERE FK_idProducto = idProducto;

SET realStock = cantStock - cantOut;

IF realStock < newCant THEN 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'No hay suficientes productos en el inventario';
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `clientescxruta`
--

/*!50001 DROP VIEW IF EXISTS `clientescxruta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `clientescxruta` AS select `cliente`.`idCliente` AS `idCliente`,`cliente`.`nombre` AS `nc`,`cliente`.`direccion` AS `direccion`,`ruta`.`idRuta` AS `idRuta`,`ruta`.`nombre` AS `nombre` from (`cliente` join `ruta` on((`cliente`.`FK_idRuta` = `ruta`.`idRuta`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `conductoresarutas`
--

/*!50001 DROP VIEW IF EXISTS `conductoresarutas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `conductoresarutas` AS select `conductor`.`idConductor` AS `idConductor`,`conductor`.`nombre` AS `cn`,`ruta`.`idRuta` AS `idRuta`,`ruta`.`nombre` AS `nombre` from ((`conductor` join `conductorruta` on((`conductor`.`idConductor` = `conductorruta`.`FK_idConductor`))) join `ruta` on((`conductorruta`.`FK_idRuta` = `ruta`.`idRuta`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ventasxciudad`
--

/*!50001 DROP VIEW IF EXISTS `ventasxciudad`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ventasxciudad` AS select `ciudad`.`idCiudad` AS `idCiudad`,`ciudad`.`nombre` AS `nombre`,sum((`productopedido`.`cantidad` * `producto`.`valorUnidad`)) AS `CiudadP` from (((((`ciudad` join `ruta` on((`ciudad`.`idCiudad` = `ruta`.`FK_idCiudadDestino`))) join `conductorruta` on((`ruta`.`idRuta` = `conductorruta`.`FK_idRuta`))) join `pedido` on((`conductorruta`.`idConductorRuta` = `pedido`.`FK_idConductorRuta`))) join `productopedido` on((`pedido`.`idPedido` = `productopedido`.`FK_idPedido`))) join `producto` on((`productopedido`.`FK_idProducto` = `producto`.`idProducto`))) group by `ciudad`.`idCiudad` order by `ciudad`.`idCiudad` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ventasxcliente`
--

/*!50001 DROP VIEW IF EXISTS `ventasxcliente`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ventasxcliente` AS select `cliente`.`idCliente` AS `idcliente`,`cliente`.`nombre` AS `nombre`,`cliente`.`direccion` AS `direccion`,sum((`productopedido`.`cantidad` * `producto`.`valorUnidad`)) AS `CP` from (((`cliente` join `pedido` on((`cliente`.`idCliente` = `pedido`.`FK_idCliente`))) join `productopedido` on((`pedido`.`idPedido` = `productopedido`.`FK_idPedido`))) join `producto` on((`productopedido`.`FK_idProducto` = `producto`.`idProducto`))) group by `cliente`.`idCliente` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-27 12:12:30
