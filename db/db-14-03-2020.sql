CREATE DATABASE  IF NOT EXISTS `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdministrador` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `contrasena` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`)
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
  `email` varchar(100) NOT NULL UNIQUE,
  `contrasena` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2020-03-20','2020-03-11',1026299996,2),(3,'2020-03-21','2020-03-14',555,3);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

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
  `FK_idPermiso` bigint(20) NOT NULL,
  PRIMARY KEY (`FK_idAdministrador`, `FK_idPermiso`),
  CONSTRAINT `permisoadministrador_ibfk_1` FOREIGN KEY (`FK_idAdministrador`) REFERENCES `administrador` (`idAdministrador`)
  CONSTRAINT `permisoadministrador_ibfk_2` FOREIGN KEY (`FK_idPermiso`) REFERENCES `permiso` (`idPermiso`)
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
  `FK_idPermiso` bigint(20) NOT NULL,
  PRIMARY KEY (`FK_idCliente`, `FK_idPermiso`),
  CONSTRAINT `permisocliente_ibfk_1` FOREIGN KEY (`FK_idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `permisocliente_ibfk_2` FOREIGN KEY (`FK_idPermiso`) REFERENCES `permiso` (`idPermiso`)
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
INSERT INTO `productopedido` VALUES (1,1,120),(1,2,100);
/*!40000 ALTER TABLE `productopedido` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `sessions` VALUES ('Ae_NRpan5AiWe82Fghgd6CEJ_MbmMjMi',1584319484,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('L8Qqs3HN4cLdsivlVH6kPXw1OIfkulU2',1584319646,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-14 21:19:20
