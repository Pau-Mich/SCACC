-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: centro_de_computo
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `accesos_diarios`
--

DROP TABLE IF EXISTS `accesos_diarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesos_diarios` (
  `id_acceso` int NOT NULL AUTO_INCREMENT,
  `id_usuario_id` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `uso_maquina` varchar(2) DEFAULT NULL,
  `sala` varchar(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_acceso`),
  KEY `fk_acceso_usuario` (`id_usuario_id`),
  CONSTRAINT `accesos_diarios_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_acceso_usuario` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesos_diarios`
--

LOCK TABLES `accesos_diarios` WRITE;
/*!40000 ALTER TABLE `accesos_diarios` DISABLE KEYS */;
INSERT INTO `accesos_diarios` VALUES (1,20190001,'2023-11-06','07:00:00','si','B'),(2,20190002,'2023-11-06','08:00:00','no','A'),(3,20190003,'2023-11-06','09:00:00','no','B'),(4,20190001,'2023-11-07','10:00:00','si','A'),(5,20190002,'2023-11-07','11:00:00','si','B'),(6,1001,'2024-11-18','08:15:00','si','A'),(7,1002,'2024-11-18','09:00:00','si','B'),(8,2001,'2024-11-18','10:30:00','no','A'),(9,3001,'2024-11-18','11:45:00','si','A'),(10,4000,'2024-11-18','13:00:00','si','A'),(11,20190001,'2024-11-18','14:15:00','no','A'),(12,20190002,'2024-11-18','15:30:00','no','C'),(13,20190003,'2024-11-18','16:45:00','no','C'),(14,20190006,'2024-11-18','17:00:00','no','A'),(15,20190006,'2024-11-18','18:30:00','si','A'),(16,20190006,'2024-11-19','08:00:00','no','C'),(17,20190007,'2024-11-19','09:45:00','no','B'),(18,20190009,'2024-11-19','10:15:00','si','A'),(19,20190009,'2024-11-19','11:30:00','no','C'),(20,20190010,'2024-11-19','12:45:00','no','B'),(21,20190011,'2024-11-19','13:15:00','si','B'),(22,20190012,'2024-11-19','14:00:00','no','C'),(23,20190013,'2024-11-19','15:30:00','si','B'),(24,20190014,'2024-11-19','16:45:00','si','C'),(26,20190020,'2024-11-20','08:00:00','no','C'),(27,20190021,'2024-11-20','09:00:00','si','A'),(28,20190022,'2024-11-20','10:00:00','no','C'),(29,20190023,'2024-11-20','11:00:00','si','A'),(30,20190024,'2024-11-20','12:00:00','no','C'),(31,20190026,'2024-11-20','13:00:00','si','A'),(32,20190027,'2024-11-20','14:00:00','no','A'),(33,20190028,'2024-11-20','15:00:00','si','A'),(34,20190029,'2024-11-20','16:00:00','no','B'),(35,20190030,'2024-11-20','17:00:00','si','B'),(36,20190031,'2024-11-20','18:00:00','no','B'),(37,20190032,'2024-11-20','19:00:00','si','B'),(38,20190033,'2024-11-20','20:00:00','no','B'),(39,20190035,'2024-11-21','07:00:00','si','B'),(40,20200005,'2024-11-21','08:00:00','no','B'),(41,20210004,'2024-11-21','09:00:00','si','C'),(42,20210034,'2024-11-21','10:00:00','no','C'),(43,20220005,'2024-11-21','11:00:00','si','B'),(44,20220008,'2024-11-21','12:00:00','no','B'),(45,20220019,'2024-11-21','13:00:00','si','C'),(46,20220025,'2024-11-21','14:00:00','no','A'),(59,20220008,'2025-05-29','20:12:48','si','B'),(60,20190006,'2025-05-29','21:17:15','No','A'),(61,20200005,'2025-05-29','23:25:44','Si','B'),(62,20190033,'2025-05-29','23:25:51','Si','A'),(63,20190033,'2025-05-30','16:26:58','Si','B'),(64,20200005,'2025-06-16','16:11:27','Si','A'),(65,20200005,'2025-06-16','16:55:39','No','B');
/*!40000 ALTER TABLE `accesos_diarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add dispositivo',7,'add_dispositivo'),(26,'Can change dispositivo',7,'change_dispositivo'),(27,'Can delete dispositivo',7,'delete_dispositivo'),(28,'Can view dispositivo',7,'view_dispositivo'),(29,'Can add horario',8,'add_horario'),(30,'Can change horario',8,'change_horario'),(31,'Can delete horario',8,'delete_horario'),(32,'Can view horario',8,'view_horario'),(33,'Can add invitado',9,'add_invitado'),(34,'Can change invitado',9,'change_invitado'),(35,'Can delete invitado',9,'delete_invitado'),(36,'Can view invitado',9,'view_invitado'),(37,'Can add usuario',10,'add_usuario'),(38,'Can change usuario',10,'change_usuario'),(39,'Can delete usuario',10,'delete_usuario'),(40,'Can view usuario',10,'view_usuario'),(41,'Can add reservacion',11,'add_reservacion'),(42,'Can change reservacion',11,'change_reservacion'),(43,'Can delete reservacion',11,'delete_reservacion'),(44,'Can view reservacion',11,'view_reservacion'),(45,'Can add prestamo',12,'add_prestamo'),(46,'Can change prestamo',12,'change_prestamo'),(47,'Can delete prestamo',12,'delete_prestamo'),(48,'Can view prestamo',12,'view_prestamo'),(49,'Can add acceso diario',13,'add_accesodiario'),(50,'Can change acceso diario',13,'change_accesodiario'),(51,'Can delete acceso diario',13,'delete_accesodiario'),(52,'Can view acceso diario',13,'view_accesodiario'),(53,'Can add huella dactilar',14,'add_huelladactilar'),(54,'Can change huella dactilar',14,'change_huelladactilar'),(55,'Can delete huella dactilar',14,'delete_huelladactilar'),(56,'Can view huella dactilar',14,'view_huelladactilar');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivos`
--

DROP TABLE IF EXISTS `dispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivos` (
  `numero_serie` int NOT NULL,
  `numero_dispositivo` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `marca` varchar(20) NOT NULL DEFAULT 'activo',
  `modelo` varchar(50) NOT NULL,
  PRIMARY KEY (`numero_serie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos`
--

LOCK TABLES `dispositivos` WRITE;
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
INSERT INTO `dispositivos` VALUES (1,'Cañon ','Cañon','2023-01-01','Sony','343'),(2,'Bocina ','Bocina','2023-02-01','JBL','22'),(4,'Micrófono ','Micrófono','2023-04-01','shure','244'),(5,'Mouse ','Mouse','2023-05-01','Logitech','221'),(6,'Laptop ','Laptop','2023-06-01','Dell','33'),(7,'Extensión ','Extensión','2023-07-01','Electrica','5543'),(8,'Adaptador HDMI','Adaptador','2023-08-01','LG','2245'),(9,'Cañon ','Cañon','2023-09-01','Epson','5533'),(11,'Teclado','Teclado','2023-11-01','HP','200'),(12,'Monitor','Monitor','2023-12-01','Dell','U2718Q'),(13,'Impresora','Impresora','2024-01-01','Canon','MG3620'),(14,'Router','Router','2024-02-01','TP-Link','Archer C7'),(15,'Switch','Switch','2024-03-01','Cisco','SG350'),(16,'Servidor','Servidor','2024-04-01','HP','ProLiant DL360'),(17,'Proyector','Proyector','2024-05-01','BenQ','MW535'),(18,'Disco Duro','Disco Duro','2024-06-01','Seagate','ST1000DM010'),(19,'UPS','UPS','2024-07-01','APC','BR1000G'),(20,'Conmutador','Conmutador','2024-08-01','Panasonic','KX-HTS32'),(21,'Escáner','Escáner','2024-09-01','Epson','Perfection V600'),(22,'Cámara Web','Cámara Web','2024-10-01','Logitech','C920'),(23,'Control Remoto','Control Remoto','2024-11-01','Sony','RM-EZ4'),(24,'Cargador','Cargador','2024-12-01','Anker','PowerPort'),(25,'Consola','Consola','2025-01-01','Nintendo','Switch'),(40,' cañon 5','Cañon','2025-06-01','Proyecta','KWDD');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(13,'auth_app','accesodiario'),(7,'auth_app','dispositivo'),(8,'auth_app','horario'),(14,'auth_app','huelladactilar'),(9,'auth_app','invitado'),(12,'auth_app','prestamo'),(11,'auth_app','reservacion'),(10,'auth_app','usuario'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-05-18 01:31:38.807546'),(2,'auth','0001_initial','2025-05-18 01:31:39.359856'),(3,'admin','0001_initial','2025-05-18 01:31:39.491336'),(4,'admin','0002_logentry_remove_auto_add','2025-05-18 01:31:39.502419'),(5,'admin','0003_logentry_add_action_flag_choices','2025-05-18 01:31:39.510390'),(6,'contenttypes','0002_remove_content_type_name','2025-05-18 01:31:39.587793'),(7,'auth','0002_alter_permission_name_max_length','2025-05-18 01:31:39.647395'),(8,'auth','0003_alter_user_email_max_length','2025-05-18 01:31:39.669346'),(9,'auth','0004_alter_user_username_opts','2025-05-18 01:31:39.676365'),(10,'auth','0005_alter_user_last_login_null','2025-05-18 01:31:39.741679'),(11,'auth','0006_require_contenttypes_0002','2025-05-18 01:31:39.745119'),(12,'auth','0007_alter_validators_add_error_messages','2025-05-18 01:31:39.751749'),(13,'auth','0008_alter_user_username_max_length','2025-05-18 01:31:39.822739'),(14,'auth','0009_alter_user_last_name_max_length','2025-05-18 01:31:39.891045'),(15,'auth','0010_alter_group_name_max_length','2025-05-18 01:31:39.916392'),(16,'auth','0011_update_proxy_permissions','2025-05-18 01:31:39.926034'),(17,'auth','0012_alter_user_first_name_max_length','2025-05-18 01:31:39.991755'),(18,'auth_app','0001_initial','2025-05-18 01:33:05.704403'),(19,'sessions','0001_initial','2025-05-18 01:33:09.697785');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `id_horario` int NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id_horario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,'07:00:00','08:00:00'),(2,'08:00:00','09:00:00'),(3,'09:00:00','10:00:00'),(4,'10:00:00','11:00:00'),(5,'11:00:00','12:00:00'),(6,'12:00:00','13:00:00'),(7,'13:00:00','14:00:00'),(8,'14:00:00','15:00:00'),(9,'15:00:00','16:00:00'),(10,'16:00:00','17:00:00'),(11,'17:00:00','18:00:00'),(12,'18:00:00','19:00:00'),(13,'19:00:00','20:00:00');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huellas_dactilares`
--

DROP TABLE IF EXISTS `huellas_dactilares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huellas_dactilares` (
  `id_huella` int NOT NULL,
  `id_usuario_id` int DEFAULT NULL,
  `huella` text,
  PRIMARY KEY (`id_huella`),
  UNIQUE KEY `id_usuario` (`id_usuario_id`),
  CONSTRAINT `fk_huella_usuario` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `huellas_dactilares_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huellas_dactilares`
--

LOCK TABLES `huellas_dactilares` WRITE;
/*!40000 ALTER TABLE `huellas_dactilares` DISABLE KEYS */;
INSERT INTO `huellas_dactilares` VALUES (1,20190001,'huella_001'),(2,20190002,'huella_002'),(3,20190003,'huella_003'),(4,1001,'huella_004'),(5,1002,'huella_005'),(6,2001,'huella_006'),(7,2002,'huella_007'),(8,2003,'huella_008'),(9,3001,'huella_009'),(10,3002,'huella_010'),(11,3003,'huella_011'),(12,4000,'huella_012'),(13,4003,'huella_013'),(14,20190006,'huella_014'),(15,20190007,'huella_015'),(16,20190009,'huella_016'),(17,20190010,'huella_017'),(18,20190011,'huella_018'),(19,20190012,'huella_019'),(20,20190013,'huella_020'),(21,20190014,'huella_021'),(22,20190015,'huella_022'),(23,20190016,'huella_023'),(24,20190017,'huella_024'),(25,20190018,'huella_025'),(26,1003,'huella_026'),(27,1004,'huella_027'),(28,1005,'huella_028'),(29,1006,'huella_029'),(30,1007,'huella_030'),(31,1008,'huella_031'),(32,1009,'huella_032'),(33,1010,'huella_033'),(34,1011,'huella_034'),(35,1012,'huella_035'),(36,1013,'huella_036'),(37,1014,'huella_037'),(38,1015,'huella_038'),(39,1016,'huella_039'),(40,1017,'huella_040'),(41,1018,'huella_041'),(42,1019,'huella_042'),(43,1020,'huella_043'),(44,1021,'huella_044'),(45,1022,'huella_045'),(46,1023,'huella_046'),(47,1024,'huella_047'),(48,1025,'huella_048'),(49,1026,'huella_049'),(50,1027,'huella_050'),(51,1028,'huella_051'),(52,1029,'huella_052'),(53,1030,'huella_053'),(54,1031,'huella_054'),(55,1032,'huella_055'),(56,2004,'huella_056'),(57,2005,'huella_057'),(58,2006,'huella_058'),(59,2007,'huella_059'),(60,2008,'huella_060'),(61,2009,'huella_061'),(62,2010,'huella_062'),(63,2011,'huella_063'),(64,2012,'huella_064'),(65,2013,'huella_065'),(67,20190020,'huella_067'),(68,20190021,'huella_068'),(69,20190022,'huella_069'),(70,20190023,'huella_070'),(71,20190024,'huella_071'),(72,20190026,'huella_072'),(73,20190027,'huella_073'),(74,20190028,'huella_074'),(75,20190029,'huella_075'),(76,20190030,'huella_076'),(77,20190031,'huella_077'),(78,20190032,'huella_078'),(79,20190033,'huella_079'),(80,20190035,'huella_080'),(81,20190037,'huella_081'),(82,20190038,'huella_082'),(83,20190039,'huella_083'),(84,20190040,'huella_084'),(85,20190041,'huella_085'),(86,20190042,'huella_086'),(87,20190043,'huella_087'),(88,20190044,'huella_088'),(89,20190045,'huella_089'),(90,20190046,'huella_090'),(91,20190047,'huella_091'),(92,20190048,'huella_092'),(93,20190050,'huella_093'),(94,20190051,'huella_094'),(95,20190052,'huella_095'),(96,20190053,'huella_096'),(97,20190054,'huella_097'),(98,20190055,'huella_098'),(99,20190056,'huella_099'),(100,20190057,'huella_100'),(101,20190060,'huella_101');
/*!40000 ALTER TABLE `huellas_dactilares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitados`
--

DROP TABLE IF EXISTS `invitados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitados` (
  `id_invitado` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `hora_entrada` time DEFAULT NULL,
  `motivo_visita` text,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_invitado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitados`
--

LOCK TABLES `invitados` WRITE;
/*!40000 ALTER TABLE `invitados` DISABLE KEYS */;
INSERT INTO `invitados` VALUES (1,'Eduardo','Ramirez','eduardo.ramirez@ejemplo.com','5551234571','09:30:00','Auditoria',NULL,NULL),(2,'María','Gómez','maria.gomez@ejemplo.com','5559876543','10:30:00','Asesoría técnica',NULL,NULL),(3,'Carlos','Sánchez','carlos.sanchez@ejemplo.com','5553456789','11:15:00','Entrega de documentos',NULL,NULL),(4,'Laura','Ramírez','laura.ramirez@ejemplo.com','5558765432','13:00:00','Charla académica',NULL,NULL),(5,'Ana','López','ana.lopez@ejemplo.com','5552345678','14:45:00','Consulta de proyectos',NULL,NULL),(6,'Miguel','Hernández','miguel.hernandez@ejemplo.com','5557654321','15:30:00','Revisión de equipo',NULL,NULL),(7,'Sofía','Torres','sofia.torres@ejemplo.com','5555432167','16:00:00','Sesión de capacitación',NULL,NULL),(8,'Alberto','García','alberto.garcia@ejemplo.com','5551234681','09:00:00','Reunión de Negocios',NULL,NULL),(9,'Beatriz','Méndez','beatriz.mendez@ejemplo.com','5551234682','09:30:00','Entrevista de Trabajo',NULL,NULL),(10,'Carlos','Pérez','carlos.perez@ejemplo.com','5551234683','10:00:00','Visita Técnica',NULL,NULL),(11,'Diana','López','diana.lopez@ejemplo.com','5551234684','10:30:00','Consulta Médica',NULL,NULL),(12,'Emilio','Martínez','emilio.martinez@ejemplo.com','5551234685','11:00:00','Capacitación',NULL,NULL),(13,'Fernanda','Sánchez','fernanda.sanchez@ejemplo.com','5551234686','11:30:00','Reunión de Proyecto',NULL,NULL),(14,'Guillermo','Rodríguez','guillermo.rodriguez@ejemplo.com','5551234687','12:00:00','Auditoría',NULL,NULL),(15,'Helena','Gómez','helena.gomez@ejemplo.com','5551234688','12:30:00','Presentación de Producto',NULL,NULL),(16,'Ignacio','Díaz','ignacio.diaz@ejemplo.com','5551234689','13:00:00','Demostración Técnica',NULL,NULL),(17,'Javier','Morales','javier.morales@ejemplo.com','5551234690','13:30:00','Consultoría',NULL,NULL),(18,'Karla','Romero','karla.romero@ejemplo.com','5551234691','14:00:00','Negociación Comercial',NULL,NULL),(19,'Luis','Torres','luis.torres@ejemplo.com','5551234692','14:30:00','Revisión de Contrato',NULL,NULL),(20,'Marta','Hernández','marta.hernandez@ejemplo.com','5551234693','15:00:00','Taller Educativo',NULL,NULL),(21,'Néstor','Jiménez','nestor.jimenez@ejemplo.com','5551234694','15:30:00','Actualización de Software',NULL,NULL),(22,'Olga','Ruiz','olga.ruiz@ejemplo.com','5551234695','16:00:00','Capacitación Interna',NULL,NULL),(23,'Pablo','Vargas','pablo.vargas@ejemplo.com','5551234696','16:30:00','Evaluación de Proyectos',NULL,NULL),(24,'Quintina','Castillo','quintina.castillo@ejemplo.com','5551234697','17:00:00','Reunión Estratégica',NULL,NULL),(25,'Raúl','Molina','raul.molina@ejemplo.com','5551234698','17:30:00','Sesión de Feedback',NULL,NULL),(26,'Sandra','Núñez','sandra.nunez@ejemplo.com','5551234699','18:00:00','Encuentro Académico',NULL,NULL),(27,'Tomás','Alonso','tomas.alonso@ejemplo.com','5551234700','18:30:00','Presentación de Resultados',NULL,NULL),(28,'Úrsula','Pacheco','ursula.pacheco@ejemplo.com','5551234701','19:00:00','Colaboración Técnica',NULL,NULL),(29,'Víctor','Carrillo','victor.carrillo@ejemplo.com','5551234702','19:30:00','Revisión de Proceso',NULL,NULL),(30,'Wendy','Serrano','wendy.serrano@ejemplo.com','5551234703','20:00:00','Sesión de Trabajo',NULL,NULL),(31,'Ximena','Figueroa','ximena.figueroa@ejemplo.com','5551234704','20:30:00','Seminario',NULL,NULL),(32,'Yuri','Guerra','yuri.guerra@ejemplo.com','5551234705','21:00:00','Reunión Informativa',NULL,NULL),(33,'Zacarías','Reyes','zacarias.reyes@ejemplo.com','5551234706','21:30:00','Visita de Seguimiento',NULL,NULL),(34,'Adriana','Ávila','adriana.avila@ejemplo.com','5551234707','22:00:00','Sesión de Innovación',NULL,NULL),(35,'Benjamín','Sandoval','benjamin.sandoval@ejemplo.com','5551234708','22:30:00','Reunión Técnica',NULL,NULL),(36,'Camila','Ramos','camila.ramos@ejemplo.com','5551234709','23:00:00','Asesoría Legal',NULL,NULL),(37,'Daniel','Flores','daniel.flores@ejemplo.com','5551234710','23:30:00','Reunión de Planificación',NULL,NULL),(38,'Elena','González','elena.gonzalez@ejemplo.com','5551234711','00:00:00','Revisión de Proyecto',NULL,NULL),(39,'Felipe','Suárez','felipe.suarez@ejemplo.com','5551234712','00:30:00','Capacitación Externa',NULL,NULL),(40,'Gabriela','Peña','gabriela.pena@ejemplo.com','5551234713','01:00:00','Auditoría Interna',NULL,NULL),(41,'Héctor','Rojas','hector.rojas@ejemplo.com','5551234714','01:30:00','Evaluación Técnica',NULL,NULL),(42,'Isabel','Méndez','isabel.mendez@ejemplo.com','5551234715','02:00:00','Demostración de Producto',NULL,NULL);
/*!40000 ALTER TABLE `invitados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `id_prestamo` int NOT NULL AUTO_INCREMENT,
  `id_usuario_id` int DEFAULT NULL,
  `id_dispositivo_id` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `firma` varchar(45) DEFAULT NULL,
  `proposito` varchar(200) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_prestamo`),
  KEY `id_dispositivo` (`id_dispositivo_id`),
  KEY `fk_prestamo_usuario` (`id_usuario_id`),
  CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`id_dispositivo_id`) REFERENCES `dispositivos` (`numero_serie`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
INSERT INTO `prestamos` VALUES (33,1001,6,'Devuelto','08:30:00','10:00:00','Firma digital A1','Taller de programación','2025-06-08'),(34,1002,7,'Devuelto','10:15:00','11:45:00','Firma digital B2','Examen de bases de datos','2025-06-07'),(35,1003,4,'Devuelto','13:00:00','14:30:00','Firma digital C3','Presentación final','2025-06-06'),(36,1004,5,'Atrasado','09:00:00','10:30:00','Firma digital D4','Práctica de redes','2025-06-05'),(37,1005,1,'Devuelto','14:00:00','15:30:00','Firma digital E5','Laboratorio de sistemas','2025-06-08'),(38,1006,2,'Devuelto','08:00:00','09:30:00','Firma digital F6','Proyección educativa','2025-06-04'),(39,1007,8,'Devuelto','11:00:00','12:00:00','Firma digital G7','Simulación de procesos','2025-06-03'),(40,1008,9,'Devuelto','12:15:00','13:45:00','Firma digital H8','Grabación de clase','2025-06-01'),(41,1009,11,'Devuelto','13:30:00','15:00:00','Firma digital I9','Edición de video','2025-06-01'),(42,1010,12,'Devuelto','09:00:00','10:15:00','Firma digital J10','Toma de examen','2025-06-08'),(43,1011,13,'Devuelto','10:45:00','12:00:00','Firma digital K11','Conferencia virtual','2025-06-02'),(44,1012,14,'Devuelto','15:00:00','16:30:00','Firma digital L12','Prueba de hardware','2025-06-07'),(45,1013,15,'Devuelto','08:30:00','10:00:00','Firma digital M13','Escaneo de documentos','2025-06-03'),(46,1014,16,'Devuelto','11:15:00','12:30:00','Firma digital N14','Revisión de prácticas','2025-06-06'),(47,1015,17,'Devuelto','10:00:00','11:30:00','Firma digital O15','Redacción técnica','2025-06-08'),(48,1016,18,'Devuelto','13:00:00','14:30:00','Firma digital P16','Clase híbrida','2025-06-07'),(49,1017,19,'Devuelto','14:45:00','16:00:00','Firma digital Q17','Capacitación virtual','2025-06-05'),(50,1018,20,'Devuelto','16:15:00','17:45:00','Firma digital R18','Consultoría académica','2025-06-06'),(51,1019,21,'Devuelto','08:45:00','10:15:00','Firma digital S19','Exposición de proyecto','2025-06-08'),(52,1020,22,'Devuelto','12:00:00','13:30:00','Firma digital T20','Simulación de red','2025-06-04'),(53,8003,11,'Atrasado','13:20:00','14:20:00','Firma','Clase de redes','2025-06-08'),(54,8003,12,'Devuelto','22:21:00','23:21:00','','para ver netflix','2025-06-10');
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservaciones`
--

DROP TABLE IF EXISTS `reservaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservaciones` (
  `id_reservacion` int NOT NULL AUTO_INCREMENT,
  `id_usuario_id` int DEFAULT NULL,
  `id_horario_id` int DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `modalidad` varchar(50) DEFAULT NULL,
  `materia` varchar(100) DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  `grupo` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `sala` varchar(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_reservacion`),
  KEY `id_usuario` (`id_usuario_id`),
  KEY `id_horario` (`id_horario_id`),
  CONSTRAINT `reservaciones_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `reservaciones_ibfk_3` FOREIGN KEY (`id_horario_id`) REFERENCES `horarios` (`id_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservaciones`
--

LOCK TABLES `reservaciones` WRITE;
/*!40000 ALTER TABLE `reservaciones` DISABLE KEYS */;
INSERT INTO `reservaciones` VALUES (161,1001,1,'2025-05-05','2025-05-07','Semestral','Álgebra',3,'A','Activa','A'),(162,1002,2,'2025-05-06','2025-05-08','Única vez','POO',5,'C','Activa','A'),(163,1003,3,'2025-05-07','2025-05-09','Semestral','Estructuras',1,'C','Activa','A'),(164,1004,4,'2025-05-08','2025-05-10','Única vez','Cálculo',4,'D','Activa','B'),(165,1005,5,'2025-05-09','2025-05-11','Semestral','Física',6,'E','Activa','C'),(166,1006,6,'2025-05-10','2025-05-12','Única vez','Química',2,'A','Activa','C'),(167,1007,7,'2025-05-11','2025-05-13','Semestral','Biología',3,'C','Activa','C'),(168,1008,8,'2025-05-12','2025-05-14','Única vez','Historia',5,'C','Activa','A'),(169,1009,9,'2025-05-13','2025-05-15','Semestral','Geografía',1,'C','Activa','A'),(170,1010,10,'2025-05-14','2025-05-16','Única vez','Literatura',6,'A','Activa','A'),(171,1011,11,'2025-05-15','2025-05-17','Semestral','Informática',1,'B','Activa','A'),(172,1012,12,'2025-05-16','2025-05-18','Semestral','Filosofía',2,'B','Activa','A'),(173,1013,13,'2025-05-17','2025-05-19','Única vez','Música',4,'C','Activa','A'),(174,1014,10,'2025-05-18','2025-05-20','Semestral','Arte',3,'D','Activa','A'),(175,1015,2,'2025-05-19','2025-05-21','Semestral','Robótica',5,'A','Activa','C'),(176,1016,3,'2025-05-20','2025-05-22','Única vez','Estadística',6,'C','Activa','B'),(177,1017,5,'2025-05-21','2025-05-23','Semestral','Programación',2,'B','Activa','A'),(178,1018,5,'2025-05-22','2025-05-24','Única vez','Redes',1,'A','Activa','A'),(179,1019,4,'2025-05-23','2025-05-25','Semestral','Bases de Datos',3,'D','Activa','A'),(180,1020,6,'2025-05-24','2025-05-26','Semestral','Ética',4,'C','Activa','A'),(181,1021,7,'2025-05-25','2025-05-27','Única vez','Lógica',5,'B','Activa','A'),(182,1022,8,'2025-05-26','2025-05-28','Semestral','Algebra lineal',6,'A','Activa','A'),(183,1023,9,'2025-05-27','2025-05-29','Semestral','Probabilidad',2,'C','Activa','A'),(184,1024,10,'2025-05-28','2025-05-30','Única vez','Sistemas Operativos',3,'B','Activa','A'),(185,1025,11,'2025-05-29','2025-05-31','Semestral','TIC',1,'D','Activa','A'),(187,1027,13,'2025-05-31','2025-06-02','Única vez','Microcontroladores',5,'D','Activa','A'),(188,1028,10,'2025-06-01','2025-06-03','Semestral','Matemáticas Discretas',6,'B','Activa','A'),(189,1029,9,'2025-06-02','2025-06-04','Semestral','Compiladores',1,'C','Activa','C'),(190,1030,3,'2025-06-03','2025-06-05','Única vez','Desarrollo Web',3,'A','Activa','A'),(191,1031,8,'2025-06-04','2025-06-06','Semestral','Ingeniería de Software',2,'D','Activa','B'),(192,1032,10,'2025-06-05','2025-06-07','Semestral','Seguridad Informática',4,'B','Activa','A'),(193,1016,8,'2025-05-12','2025-05-16','Semestral','Química',4,'E','Activa','A'),(194,1023,13,'2025-05-21','2025-05-21','Unica vez','Pentesting',6,'A','Activa','C'),(195,1026,12,'2025-05-26','2025-05-30','Unica vez','Seminario de Titulación',9,'A','Activa','A'),(196,1026,13,'2025-05-26','2025-05-30','Unica vez','Seminario de Titulación',9,'A','Activa','A'),(197,4000,1,'2025-06-02','2025-06-07','Unica vez','Seminario de Titulación',7,'C','Activa','B'),(198,2010,11,'2025-12-17','2025-12-19','Unica vez','Seminario de Titulación',8,'A','Activa','B'),(200,1032,10,'2025-10-20','2025-10-25','Unica vez','Redes neuronales',6,'A','Activa','C'),(201,1016,1,'2025-05-27','2025-06-07','Unica vez','Redes neuronales',9,'A','Activa','A');
/*!40000 ALTER TABLE `reservaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salas` (
  `id_sala` int NOT NULL,
  `nombre` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (1,'A'),(2,'B'),(3,'C');
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `programa_educativo_area` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasenia` varchar(100) DEFAULT NULL,
  `semestre` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1001,'Pedro','Sanchez','Profesor','Ingeniería en Computación','5551234566','pedro.sanchez@ejemplo.com','pass123',NULL,'Activo',NULL),(1002,'Laura','Diaz','Profesor','Matemáticas Aplicadas','5551234567','laura.diaz@ejemplo.com','pass123',NULL,'Activo',NULL),(1003,'Ana','Serrano','Profesor','Ingeniería en Computación','5551234600','ana.serrano@ejemplo.com','pass123',NULL,'Activo',NULL),(1004,'Carlos','Ibarra','Profesor','Matemáticas Aplicadas','5551234601','carlos.ibarra@ejemplo.com','pass123',NULL,'Activo',NULL),(1005,'Elena','Cortés','Profesor','Ingeniería Química','5551234602','elena.cortes@ejemplo.com','pass123',NULL,'Activo',NULL),(1006,'José','Molina','Profesor','Química Industrial','5551234603','jose.molina@ejemplo.com','pass123',NULL,'Activo',NULL),(1007,'Marta','Gómez','Profesor','Sistemas Electrónicos','5551234604','marta.gomez@ejemplo.com','pass123',NULL,'Activo',NULL),(1008,'Luis','Ortega','Profesor','Ingeniería en Computación','5551234605','luis.ortega@ejemplo.com','pass123',NULL,'Activo',NULL),(1009,'Clara','Martínez','Profesor','Matemáticas Aplicadas','5551234606','clara.martinez@ejemplo.com','pass123',NULL,'Activo',NULL),(1010,'Andrés','Ramírez','Profesor','Ingeniería Química','5551234607','andres.ramirez@ejemplo.com','pass123',NULL,'Activo',NULL),(1011,'Sara','López','Profesor','Química Industrial','5551234608','sara.lopez@ejemplo.com','pass123',NULL,'Activo',NULL),(1012,'David','Moreno','Profesor','Sistemas Electrónicos','5551234609','david.moreno@ejemplo.com','pass123',NULL,'Activo',NULL),(1013,'Laura','Gil','Profesor','Ingeniería en Computación','5551234610','laura.gil@ejemplo.com','pass123',NULL,'Activo',NULL),(1014,'Roberto','Pérez','Profesor','Matemáticas Aplicadas','5551234611','roberto.perez@ejemplo.com','pass123',NULL,'Activo',NULL),(1015,'Pilar','Herrera','Profesor','Ingeniería Química','5551234612','pilar.herrera@ejemplo.com','pass123',NULL,'Activo',NULL),(1016,'Fernando','Cruz','Profesor','Química Industrial','5551234613','fernando.cruz@ejemplo.com','pass123',NULL,'Activo',NULL),(1017,'Patricia','Castro','Profesor','Sistemas Electrónicos','5551234614','patricia.castro@ejemplo.com','pass123',NULL,'Activo',NULL),(1018,'Miguel','Lara','Profesor','Ingeniería en Computación','5551234615','miguel.lara@ejemplo.com','pass123',NULL,'Activo',NULL),(1019,'Adriana','Vega','Profesor','Matemáticas Aplicadas','5551234616','adriana.vega@ejemplo.com','pass123',NULL,'Activo',NULL),(1020,'Rafael','Ruiz','Profesor','Ingeniería Química','5551234617','rafael.ruiz@ejemplo.com','pass123',NULL,'Activo',NULL),(1021,'Lucía','Hernández','Profesor','Química Industrial','5551234618','lucia.hernandez@ejemplo.com','pass123',NULL,'Activo',NULL),(1022,'Julio','Suárez','Profesor','Sistemas Electrónicos','5551234619','julio.suarez@ejemplo.com','pass123',NULL,'Activo',NULL),(1023,'Eva','Díaz','Profesor','Ingeniería en Computación','5551234620','eva.diaz@ejemplo.com','pass123',NULL,'Activo',NULL),(1024,'Gustavo','Ramos','Profesor','Matemáticas Aplicadas','5551234621','gustavo.ramos@ejemplo.com','pass123',NULL,'Activo',NULL),(1025,'Carmen','Flores','Profesor','Ingeniería Química','5551234622','carmen.flores@ejemplo.com','pass123',NULL,'Activo',NULL),(1026,'Alejandro','Santos','Profesor','Química Industrial','5551234623','alejandro.santos@ejemplo.com','pass123',NULL,'Activo',NULL),(1027,'Rosa','Martín','Profesor','Sistemas Electrónicos','5551234624','rosa.martin@ejemplo.com','pass123',NULL,'Activo',NULL),(1028,'Víctor','Fernández','Profesor','Ingeniería en Computación','5551234625','victor.fernandez@ejemplo.com','pass123',NULL,'Activo',NULL),(1029,'María','Vargas','Profesor','Matemáticas Aplicadas','5551234626','maria.vargas@ejemplo.com','pass123',NULL,'Activo',NULL),(1030,'Antonio','García','Profesor','Ingeniería Química','5551234627','antonio.garcia@ejemplo.com','pass123',NULL,'Activo',NULL),(1031,'Beatriz','Muñoz','Profesor','Química Industrial','5551234628','beatriz.munoz@ejemplo.com','pass123',NULL,'Activo',NULL),(1032,'Oscar','Castillo','Profesor','Sistemas Electrónicos','5551234629','oscar.castillo@ejemplo.com','pass123',NULL,'Activo',NULL),(2001,'Miguel','Rodriguez','Administrativo','Centro de Computo','5551234568','miguel.rodriguez@ejemplo.com','pass123',NULL,'Activo',NULL),(2002,'Andrea','Cruz','Profesor','Matemáticas Aplicadas','5551234578','andrea.cruz@ejemplo.com','pass123',NULL,'activo',NULL),(2003,'Ricardo','López','Profesor','Ingeniería en Computación','5551234579','ricardo.lopez@ejemplo.com','pass123',NULL,'activo',NULL),(2004,'Inés','Martínez','Administrativo','Centro de Computo','5551234630','ines.martinez@ejemplo.com','pass123',NULL,'Activo',NULL),(2005,'Raúl','Pérez','Administrativo','Centro de Computo','5551234631','raul.perez@ejemplo.com','pass123',NULL,'Activo',NULL),(2006,'Patricia','Gómez','Administrativo','Centro de Computo','5551234632','patricia.gomez@ejemplo.com','pass123',NULL,'Activo',NULL),(2007,'Carlos','Jiménez','Administrativo','Centro de Computo','5551234633','carlos.jimenez@ejemplo.com','pass123',NULL,'Activo',NULL),(2008,'Ana','López','Administrativo','Centro de Computo','5551234634','ana.lopez@ejemplo.com','pass123',NULL,'Activo',NULL),(2009,'Roberto','Hernández','Administrativo','Centro de Computo','5551234635','roberto.hernandez@ejemplo.com','pass123',NULL,'Activo',NULL),(2010,'Elena','Cruz','Administrativo','Centro de Computo','5551234636','elena.cruz@ejemplo.com','pass123',NULL,'Activo',NULL),(2011,'Fernando','Ramírez','Administrativo','Centro de Computo','5551234637','fernando.ramirez@ejemplo.com','pass123',NULL,'Activo',NULL),(2012,'Lorena','Torres','Administrativo','Centro de Computo','5551234638','lorena.torres@ejemplo.com','pass123',NULL,'Activo',NULL),(2013,'Ricardo','Sánchez','Administrativo','Centro de Computo','5551234639','ricardo.sanchez@ejemplo.com','pass123',NULL,'Activo',NULL),(2325,'n','m','t','r','23','eter@ejemplo.com','111',4,'activo',NULL),(3001,'Sandra','Jimenez','Administrativo','Centro de Computo','5551234569','sandra.jimenez@ejemplo.com','pass123',NULL,'Activo',NULL),(3002,'Lucía','Gómez','Administrativo','Centro de Cómputo','5551234580','lucia.gomez@ejemplo.com','pass123',NULL,'activo',NULL),(3003,'Fernando','Martínez','Administrativo','Centro de Cómputo','5551234581','fernando.martinez@ejemplo.com','pass123',NULL,'activo',NULL),(4000,'Raul','Morales','Profesor','Ingeniería Química','5551234570','raul.morales@ejemplo.com','pass123',NULL,'Activo',NULL),(4003,'Diego','Ramírez','Profesor','Ingeniería Química','5551234582','diego.ramirez@ejemplo.com','pass123',NULL,'activo',NULL),(8003,'Michelle','Rivera','administrativo','Ing Computación','2411596832','pasuost@7gmail.com','12',NULL,'Activo','Castillo'),(8009,'Paulina','Lopez','administrativo','','24157898562','pasuost@gmail.com','pau',NULL,'Activo','Acosta'),(20190001,'Luis','Garcia','Estudiante','Ingeniería en Computación','5551234561','luis.garcia@ejemplo.com','pass123',3,'Activo',NULL),(20190002,'Ana','Martinez','Estudiante','Matemáticas Aplicadas','5551234562','ana.martinez@ejemplo.com','pass123',5,'Activo',NULL),(20190003,'Carlos','Hernandez','Estudiante','Ingeniería Química','5551234563','carlos.hernandez@ejemplo.com','pass123',1,'Activo',NULL),(20190006,'Héctor','Vargas','Estudiante','Matemáticas Aplicadas','5551234584','hector.vargas@ejemplo.com','pass123',3,'activo',NULL),(20190007,'Sofía','Reyes','Estudiante','Ingeniería Química','5551234585','sofia.reyes@ejemplo.com','pass123',5,'activo',NULL),(20190009,'Elena','Paredes','Estudiante','Sistemas Electrónicos','5551234587','elena.paredes@ejemplo.com','pass123',4,'activo',NULL),(20190010,'Alejandro','Ortega','Estudiante','Ingeniería en Computación','5551234588','alejandro.ortega@ejemplo.com','pass123',6,'activo',NULL),(20190011,'Mariana','Duarte','Estudiante','Matemáticas Aplicadas','5551234589','mariana.duarte@ejemplo.com','pass123',1,'activo',NULL),(20190012,'Carlos','Navarro','Estudiante','Ingeniería Química','5551234590','carlos.navarro@ejemplo.com','pass123',4,'activo',NULL),(20190013,'Gabriela','Peña','Estudiante','Química Industrial','5551234591','gabriela.pena@ejemplo.com','pass123',2,'activo',NULL),(20190014,'Mario','Castro','Estudiante','Sistemas Electrónicos','5551234592','mario.castro@ejemplo.com','pass123',5,'activo',NULL),(20190015,'Valeria','Hernández','Estudiante','Ingeniería en Computación','5551234593','valeria.hernandez@ejemplo.com','pass123',3,'activo',NULL),(20190016,'Rodrigo','Mendoza','Estudiante','Matemáticas Aplicadas','5551234594','rodrigo.mendoza@ejemplo.com','pass123',6,'activo',NULL),(20190017,'Adriana','Espinoza','Estudiante','Ingeniería Química','5551234595','adriana.espinoza@ejemplo.com','pass123',1,'activo',NULL),(20190018,'Pablo','Luna','Estudiante','Química Industrial','5551234596','pablo.luna@ejemplo.com','pass123',4,'activo',NULL),(20190020,'Miguel','Torres','Estudiante','Ingeniería en Computación','5551234598','miguel.torres@ejemplo.com','pass123',5,'activo',NULL),(20190021,'Isabel','García','Estudiante','Matemáticas Aplicadas','5551234599','isabel.garcia@ejemplo.com','pass123',3,'activo',NULL),(20190022,'Alberto','Morales','Estudiante','Ingeniería Química','5551234500','alberto.morales@ejemplo.com','pass123',6,'activo',NULL),(20190023,'Fabiola','Rojas','Estudiante','Química Industrial','5551234501','fabiola.rojas@ejemplo.com','pass123',1,'activo',NULL),(20190024,'Jorge','Pérez','Estudiante','Sistemas Electrónicos','5551234502','jorge.perez@ejemplo.com','pass123',4,'activo',NULL),(20190026,'Guillermo','Rivera','Estudiante','Matemáticas Aplicadas','5551234504','guillermo.rivera@ejemplo.com','pass123',5,'activo',NULL),(20190027,'Liliana','Cervantes','Estudiante','Ingeniería Química','5551234505','liliana.cervantes@ejemplo.com','pass123',3,'activo',NULL),(20190028,'Victor','Ávila','Estudiante','Química Industrial','5551234506','victor.avila@ejemplo.com','pass123',6,'activo',NULL),(20190029,'Silvia','Vega','Estudiante','Sistemas Electrónicos','5551234507','silvia.vega@ejemplo.com','pass123',1,'activo',NULL),(20190030,'Esteban','Herrera','Estudiante','Ingeniería en Computación','5551234508','esteban.herrera@ejemplo.com','pass123',4,'activo',NULL),(20190031,'Lorena','Guzmán','Estudiante','Matemáticas Aplicadas','5551234509','lorena.guzman@ejemplo.com','pass123',2,'activo',NULL),(20190032,'Arturo','Fuentes','Estudiante','Ingeniería Química','5551234510','arturo.fuentes@ejemplo.com','pass123',5,'activo',NULL),(20190033,'Daniela','Salinas','Estudiante','Química Industrial','5551234511','daniela.salinas@ejemplo.com','pass123',3,'activo',NULL),(20190035,'Patricia','Soto','Estudiante','Ingeniería en Computación','5551234513','patricia.soto@ejemplo.com','pass123',1,'activo',NULL),(20190037,'Lucía','Ramos','Estudiante','Ingeniería en Computación','5551234601','lucia.ramos@ejemplo.com','pass123',2,NULL,NULL),(20190038,'José','Fernández','Estudiante','Matemáticas Aplicadas','5551234602','jose.fernandez@ejemplo.com','pass123',4,NULL,NULL),(20190039,'Roberto','Morales','Estudiante','Ingeniería Química','5551234603','roberto.morales@ejemplo.com','pass123',6,NULL,NULL),(20190040,'Elisa','Martínez','Estudiante','Química Industrial','5551234604','elisa.martinez@ejemplo.com','pass123',1,NULL,NULL),(20190041,'Andrés','López','Estudiante','Sistemas Electrónicos','5551234605','andres.lopez@ejemplo.com','pass123',3,NULL,NULL),(20190042,'Ana','Torres','Estudiante','Ingeniería en Computación','5551234606','ana.torres@ejemplo.com','pass123',5,NULL,NULL),(20190043,'Ricardo','Hernández','Estudiante','Matemáticas Aplicadas','5551234607','ricardo.hernandez@ejemplo.com','pass123',1,NULL,NULL),(20190044,'Laura','Reyes','Estudiante','Ingeniería Química','5551234608','laura.reyes@ejemplo.com','pass123',4,NULL,NULL),(20190045,'Fernando','Rivera','Estudiante','Química Industrial','5551234609','fernando.rivera@ejemplo.com','pass123',3,NULL,NULL),(20190046,'Paula','Gómez','Estudiante','Sistemas Electrónicos','5551234610','paula.gomez@ejemplo.com','pass123',2,NULL,NULL),(20190047,'Manuel','Martínez','Estudiante','Ingeniería en Computación','5551234611','manuel.martinez@ejemplo.com','pass123',6,NULL,NULL),(20190048,'Sofía','Salazar','Estudiante','Matemáticas Aplicadas','5551234612','sofia.salazar@ejemplo.com','pass123',4,NULL,NULL),(20190049,'Miguel','Vargas','Estudiante','Ingeniería Química','5551234613','miguel.vargas@ejemplo.com','pass123',1,NULL,NULL),(20190050,'Elena','Navarro','Estudiante','Química Industrial','5551234614','elena.navarro@ejemplo.com','pass123',2,NULL,NULL),(20190051,'Ramón','Castro','Estudiante','Sistemas Electrónicos','5551234615','ramon.castro@ejemplo.com','pass123',5,NULL,NULL),(20190052,'Luis','Alonso','Estudiante','Ingeniería en Computación','5551234616','luis.alonso@ejemplo.com','pass123',3,NULL,NULL),(20190053,'Adriana','Peña','Estudiante','Matemáticas Aplicadas','5551234617','adriana.pena@ejemplo.com','pass123',6,NULL,NULL),(20190054,'Julio','Ortega','Estudiante','Ingeniería Química','5551234618','julio.ortega@ejemplo.com','pass123',4,NULL,NULL),(20190055,'María','Cervantes','Estudiante','Química Industrial','5551234619','maria.cervantes@ejemplo.com','pass123',1,NULL,NULL),(20190056,'Alberto','Gómez','Estudiante','Sistemas Electrónicos','5551234620','alberto.gomez@ejemplo.com','pass123',2,NULL,NULL),(20190057,'Carmen','Sánchez','Estudiante','Ingeniería en Computación','5551234621','carmen.sanchez@ejemplo.com','pass123',5,NULL,NULL),(20190058,'Diego','Ramírez','Estudiante','Matemáticas Aplicadas','5551234622','diego.ramirez@ejemplo.com','pass123',3,NULL,NULL),(20190059,'Ana','Muñoz','Estudiante','Ingeniería Química','5551234623','ana.munoz@ejemplo.com','pass123',6,NULL,NULL),(20190060,'Laura','Blanco','Estudiante','Química Industrial','5551234624','laura.blanco@ejemplo.com','pass123',4,NULL,NULL),(20190061,'Carlos','Ruiz','Estudiante','Sistemas Electrónicos','5551234625','carlos.ruiz@ejemplo.com','pass123',1,NULL,NULL),(20190062,'Patricia','Fernández','Estudiante','Ingeniería en Computación','5551234626','patricia.fernandez@ejemplo.com','pass123',2,NULL,NULL),(20190063,'Marcos','García','Estudiante','Matemáticas Aplicadas','5551234627','marcos.garcia@ejemplo.com','pass123',5,NULL,NULL),(20190064,'Susana','López','Estudiante','Ingeniería Química','5551234628','susana.lopez@ejemplo.com','pass123',3,NULL,NULL),(20190065,'Javier','Martínez','Estudiante','Química Industrial','5551234629','javier.martinez@ejemplo.com','pass123',6,NULL,NULL),(20190066,'Rocío','Torres','Estudiante','Sistemas Electrónicos','5551234630','rocio.torres@ejemplo.com','pass123',4,NULL,NULL),(20200005,'Carmen','Núñez','Estudiante','Ingeniería en Computación','5551234583','carmen.nunez@ejemplo.com','pass123',1,'activo',NULL),(20210004,'Maria','Lopez','Estudiante','Química Industrial','5551234564','maria.lopez@ejemplo.com','pass123',2,'Activo',NULL),(20210034,'Enrique','Campos','Estudiante','Sistemas Electrónicos','5551234512','enrique.campos@ejemplo.com','pass123',6,'activo',NULL),(20220005,'Jose','Perez','Estudiante','Sistemas Electrónicos','5551234565','jose.perez@ejemplo.com','pass123',4,'Activo',NULL),(20220008,'Juan','Zapata','Estudiante','Química Industrial','5551234586','juan.zapata@ejemplo.com','pass123',2,'activo',NULL),(20220019,'Teresa','Blanco','Estudiante','Sistemas Electrónicos','5551234597','teresa.blanco@ejemplo.com','pass123',2,'activo',NULL),(20220025,'Monica','Estrada','Estudiante','Ingeniería en Computación','5551234503','monica.estrada@ejemplo.com','pass123',2,'activo',NULL),(20220036,'Luis','Alonso','Estudiante','Matemáticas Aplicadas','5551234514','luis.alonso@ejemplo.com','pass123',4,'activo',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-20 21:02:32
