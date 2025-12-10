-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: centro_de_computo
-- ------------------------------------------------------
-- Server version	8.0.42

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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesos_diarios`
--

LOCK TABLES `accesos_diarios` WRITE;
/*!40000 ALTER TABLE `accesos_diarios` DISABLE KEYS */;
INSERT INTO `accesos_diarios` VALUES (66,20222168,'2025-11-19','21:36:26','Si','A'),(67,1010,'2025-11-26','11:48:29','Si','A'),(68,1010,'2025-11-26','11:49:04','Si','A');
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add invitado',7,'add_invitado'),(26,'Can change invitado',7,'change_invitado'),(27,'Can delete invitado',7,'delete_invitado'),(28,'Can view invitado',7,'view_invitado'),(29,'Can add prestamo',8,'add_prestamo'),(30,'Can change prestamo',8,'change_prestamo'),(31,'Can delete prestamo',8,'delete_prestamo'),(32,'Can view prestamo',8,'view_prestamo'),(33,'Can add horario',9,'add_horario'),(34,'Can change horario',9,'change_horario'),(35,'Can delete horario',9,'delete_horario'),(36,'Can view horario',9,'view_horario'),(37,'Can add acceso diario',10,'add_accesodiario'),(38,'Can change acceso diario',10,'change_accesodiario'),(39,'Can delete acceso diario',10,'delete_accesodiario'),(40,'Can view acceso diario',10,'view_accesodiario'),(41,'Can add dispositivo',11,'add_dispositivo'),(42,'Can change dispositivo',11,'change_dispositivo'),(43,'Can delete dispositivo',11,'delete_dispositivo'),(44,'Can view dispositivo',11,'view_dispositivo'),(45,'Can add usuario',12,'add_usuario'),(46,'Can change usuario',12,'change_usuario'),(47,'Can delete usuario',12,'delete_usuario'),(48,'Can view usuario',12,'view_usuario'),(49,'Can add huella dactilar',13,'add_huelladactilar'),(50,'Can change huella dactilar',13,'change_huelladactilar'),(51,'Can delete huella dactilar',13,'delete_huelladactilar'),(52,'Can view huella dactilar',13,'view_huelladactilar'),(53,'Can add reservacion',14,'add_reservacion'),(54,'Can change reservacion',14,'change_reservacion'),(55,'Can delete reservacion',14,'delete_reservacion'),(56,'Can view reservacion',14,'view_reservacion'),(57,'Can add fecha reserva',15,'add_fechareserva'),(58,'Can change fecha reserva',15,'change_fechareserva'),(59,'Can delete fecha reserva',15,'delete_fechareserva'),(60,'Can view fecha reserva',15,'view_fechareserva');
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
  `numero_serie` varchar(16) NOT NULL,
  `numero_dispositivo` varchar(2) DEFAULT NULL,
  `tipo` varchar(40) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `marca` varchar(20) NOT NULL DEFAULT 'activo',
  `modelo` varchar(4) NOT NULL,
  PRIMARY KEY (`numero_serie`),
  UNIQUE KEY `numero_serie_UNIQUE` (`numero_serie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos`
--

LOCK TABLES `dispositivos` WRITE;
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
INSERT INTO `dispositivos` VALUES ('3453453543545353','25','Cañon','2025-08-10','Light','3543'),('3534565678234354','42','Teclado','2025-08-10','LG','3456'),('3546532421423144','22','Teclado','2025-11-19','intel','5454'),('3546549879879879','65','Cable USB','2025-08-20','Light','8979'),('5646857985312132','6','Bocina','2025-08-10','JBL','9965'),('8798798798798797','8','Mouse','2025-08-10','stf','8978'),('efsdfsddsfsdfsdf','35','Bocina','2025-08-20','Light','9898');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(10,'auth_app','accesodiario'),(11,'auth_app','dispositivo'),(15,'auth_app','fechareserva'),(9,'auth_app','horario'),(13,'auth_app','huelladactilar'),(7,'auth_app','invitado'),(8,'auth_app','prestamo'),(14,'auth_app','reservacion'),(12,'auth_app','usuario'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-08-11 02:28:52.884627'),(2,'auth','0001_initial','2025-08-11 02:28:53.744823'),(3,'admin','0001_initial','2025-08-11 02:28:53.936569'),(4,'admin','0002_logentry_remove_auto_add','2025-08-11 02:28:53.944599'),(5,'admin','0003_logentry_add_action_flag_choices','2025-08-11 02:28:53.951704'),(6,'contenttypes','0002_remove_content_type_name','2025-08-11 02:28:54.098503'),(7,'auth','0002_alter_permission_name_max_length','2025-08-11 02:28:54.192226'),(8,'auth','0003_alter_user_email_max_length','2025-08-11 02:28:54.222212'),(9,'auth','0004_alter_user_username_opts','2025-08-11 02:28:54.232147'),(10,'auth','0005_alter_user_last_login_null','2025-08-11 02:28:54.303713'),(11,'auth','0006_require_contenttypes_0002','2025-08-11 02:28:54.307834'),(12,'auth','0007_alter_validators_add_error_messages','2025-08-11 02:28:54.315588'),(13,'auth','0008_alter_user_username_max_length','2025-08-11 02:28:54.413856'),(14,'auth','0009_alter_user_last_name_max_length','2025-08-11 02:28:54.512955'),(15,'auth','0010_alter_group_name_max_length','2025-08-11 02:28:54.539020'),(16,'auth','0011_update_proxy_permissions','2025-08-11 02:28:54.553766'),(17,'auth','0012_alter_user_first_name_max_length','2025-08-11 02:28:54.656802'),(18,'sessions','0001_initial','2025-08-27 05:30:03.315803'),(19,'auth_app','0001_initial','2025-11-20 04:07:00.025861');
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
INSERT INTO `django_session` VALUES ('7lrelzlzl0j2f1yqqlzbiq1m92c1g9ub','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1urMOU:jI1YQDUiSVEBOJxbffK6ULK4ty8SFbqq7BRwpwDLgyw','2025-08-27 21:05:18.867875'),('8izq4hw7xaiqqcnz0m3kh5qtvsbglg2k','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1v9nCb:CjDyUeUFmGnLoKdI5KDekoTh8ReQNSvMdCwxRosaMLQ','2025-10-17 17:21:13.545312'),('ctdvoznkqgbxkdp4d34kp95q58bs4fla','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vLvJi:VqbOqj8JkfYo6EJx86XxeUDWqkL9WqYiybdF7VIL9hg','2025-11-20 04:26:42.296773'),('d5enx5yf8c9rqr94nb1ank7xvv6taggs','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vQXF4:5b_c85Lci8HCn2bPvpESGHp6CWCGzvAxAxttO47hqCo','2025-12-02 21:44:58.189168'),('ek9myjjlz1hfzp4z76j45yzuxpk75vw7','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vEu19:ho0WbQDyV9r12C7HJ1qU0xzDHL9XNGfWn4ggQB5FJdc','2025-10-31 19:38:31.795631'),('j9383145px6dnfq69ug6zdsmed6b8o1d','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vHXDF:Fms0BtLW2nun0515vZ1lcsOverDrJ3U-eJMpap9k0UI','2025-11-08 01:53:53.914077'),('njd6637fc0t8ixudr4wch9btc7x81277','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1utsuB:ZASiyWxXm2Fsqsk_pyYAHuUcds71KBUXJnqWn35-Mdo','2025-09-03 20:12:27.689801'),('pn2dgg1k6muylisne0tc31hjom0lp0a4','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vQDX6:BdUkomTtig1YlrL-UN3rjeh3vKxJrSLiAwCAWgszj6E','2025-12-02 00:42:16.663985'),('q0icxtza4cnyy5y4u4pah3ftym0qqqtl','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1urTTk:favnnC0JNHjyzb6ogY4C5_uocooYDeF_f_SO_u_zqvM','2025-08-28 04:39:12.070298'),('qkdrk7s1ak8d5tarx2pdk98dp1ogi8gj','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vECc2:AtwdzlzKcTZMy-cdoKSNetJdyWnZS6oylmfWZLtfNME','2025-10-29 21:17:42.036587'),('qu57hwjgxhv5l70viix6219i3fi389is','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vNh6e:s7vBCkGkbFgiVlA6ItLxByA4FWrxaQ14POLJGep4A-0','2025-11-25 01:40:32.985955'),('si8ghik1pah1gs8p95q3vrr5wsy9hzm2','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vOJcm:viqbZKsTEgdkxYY5ECZPoBet8L2ih5eraSUQB7ayt94','2025-11-26 18:48:16.867557'),('z70wf9onf1q7018cun8fbryn0arbb24a','eyJ1c3VhcmlvX2lkIjoxMDEwLCJyb2wiOiJBZG1pbmlzdHJhZG9yIiwiaXNfYXV0aGVudGljYXRlZCI6dHJ1ZSwiX3Nlc3Npb25fZXhwaXJ5IjozNjAwfQ:1vDc7C:aiziUSw1wXO6xgR8YmlMnD9IMKp1gFc7_DVBc7wpp0U','2025-10-28 06:19:26.339493');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechas_reserva`
--

DROP TABLE IF EXISTS `fechas_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechas_reserva` (
  `id_fecha` int NOT NULL AUTO_INCREMENT,
  `id_reservacion` int NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Activa',
  PRIMARY KEY (`id_fecha`),
  KEY `id_reservacion` (`id_reservacion`),
  KEY `idx_fecha` (`fecha`),
  KEY `idx_horario` (`hora_inicio`,`hora_fin`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `fechas_reserva_ibfk_1` FOREIGN KEY (`id_reservacion`) REFERENCES `reservaciones` (`id_reservacion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Fechas específicas para reservas recurrentes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechas_reserva`
--

LOCK TABLES `fechas_reserva` WRITE;
/*!40000 ALTER TABLE `fechas_reserva` DISABLE KEYS */;
INSERT INTO `fechas_reserva` VALUES (50,212,'2025-08-12','18:00:00','19:00:00','Activa'),(51,212,'2025-08-19','18:00:00','19:00:00','Activa'),(52,212,'2025-08-26','18:00:00','19:00:00','Activa'),(53,212,'2025-09-02','18:00:00','19:00:00','Activa'),(54,212,'2025-09-09','18:00:00','19:00:00','Activa'),(55,212,'2025-09-16','18:00:00','19:00:00','Activa'),(56,212,'2025-09-23','18:00:00','19:00:00','Activa'),(57,212,'2025-09-30','18:00:00','19:00:00','Activa'),(58,212,'2025-10-07','18:00:00','19:00:00','Activa'),(59,212,'2025-10-14','18:00:00','19:00:00','Activa'),(60,212,'2025-10-21','18:00:00','19:00:00','Activa'),(61,212,'2025-10-28','18:00:00','19:00:00','Activa'),(62,212,'2025-11-04','18:00:00','19:00:00','Activa'),(63,212,'2025-11-11','18:00:00','19:00:00','Activa'),(64,212,'2025-11-18','18:00:00','19:00:00','Activa'),(65,212,'2025-11-25','18:00:00','19:00:00','Activa'),(66,212,'2025-12-02','18:00:00','19:00:00','Activa'),(67,212,'2025-12-09','18:00:00','19:00:00','Activa'),(68,212,'2025-12-16','18:00:00','19:00:00','Activa'),(69,212,'2025-12-23','18:00:00','19:00:00','Activa'),(70,212,'2025-12-30','18:00:00','19:00:00','Activa'),(71,213,'2025-11-05','15:00:00','16:00:00','Activa'),(72,214,'2025-11-17','18:00:00','19:00:00','Activa'),(73,215,'2025-11-20','19:00:00','20:00:00','Activa');
/*!40000 ALTER TABLE `fechas_reserva` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `huellas_dactilares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitados`
--

DROP TABLE IF EXISTS `invitados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitados` (
  `id_invitado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `hora_entrada` time DEFAULT NULL,
  `motivo_visita` text,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_invitado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitados`
--

LOCK TABLES `invitados` WRITE;
/*!40000 ALTER TABLE `invitados` DISABLE KEYS */;
INSERT INTO `invitados` VALUES (1,'Paulina Michelle 3','Rivera2','Castillo3','20222168@uatx.mx','2415448978','19:57:00','hol','2025-10-29'),(2,'Paulina Michelle 3','Rivera2','Castillo3','20222168@uatx.mx','2415448978','20:22:00','j','2025-10-29'),(3,'5sskl','Rivera2','','20222168@uatx.mx','2415448978','15:31:00','b','2025-10-29'),(4,'Paulina Michelle ','Rivera','Castillo','20222168@uatx.mx','2415448978','21:45:00','Visita nocturna','2025-11-19');
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
  `id_dispositivo_id` varchar(16) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `firma` varchar(45) DEFAULT NULL,
  `proposito` varchar(200) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_prestamo`),
  KEY `id_dispositivo` (`id_dispositivo_id`),
  KEY `fk_prestamo_usuario` (`id_usuario_id`),
  CONSTRAINT `fk_prestamo_usuario` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
INSERT INTO `prestamos` VALUES (55,1000,'3453453543545353','Devuelto','13:13:00','14:13:00','','por que si','2025-09-03'),(56,20222168,'5646857985312132','Devuelto','01:53:00','12:53:00','','por que si','2025-11-19'),(57,1010,'5646857985312132','Devuelto','23:46:00','23:54:00','','por que si','2025-11-19'),(58,1000,'8798798798798797','Devuelto','19:55:00','23:55:00','','por que si','2025-11-19'),(59,1010,'3453453543545353','Devuelto','18:49:00','20:50:00','','kjñkljlk','2025-12-01');
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
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `modalidad` varchar(50) NOT NULL,
  `materia` varchar(50) NOT NULL,
  `semestre` int NOT NULL,
  `grupo` varchar(1) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `sala` varchar(1) NOT NULL DEFAULT '1',
  `dia_semana` varchar(10) DEFAULT NULL COMMENT 'Día de la semana para reservas recurrentes (Lunes, Martes, etc.)',
  PRIMARY KEY (`id_reservacion`),
  KEY `id_usuario` (`id_usuario_id`),
  KEY `id_horario` (`id_horario_id`),
  CONSTRAINT `reservaciones_ibfk_1` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `reservaciones_ibfk_3` FOREIGN KEY (`id_horario_id`) REFERENCES `horarios` (`id_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservaciones`
--

LOCK TABLES `reservaciones` WRITE;
/*!40000 ALTER TABLE `reservaciones` DISABLE KEYS */;
INSERT INTO `reservaciones` VALUES (212,1009,12,'2025-08-11','2025-12-31','semestral','Procesamiento de lenguaje natural',7,'A','Activa','B','Martes'),(213,1002,9,'2025-11-04','2025-11-06','semestral','Redes',8,'b','Activa','B','Miércoles'),(214,1010,12,'2025-11-17','2025-11-18','unica vez','Inteligencia Acrtificial',7,'B','Activa','B',NULL),(215,1001,13,'2025-11-20','2025-11-20','unica vez','POO',7,'B','Activa','B',NULL);
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
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `programa_educativo_area` varchar(60) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `semestre` int DEFAULT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1000,'Carlos','Ramírez','García','Docente','Ingeniería en Sistemas Computacionales','5551110001','carlos.ramirez@univ.mx',NULL,'Activo'),(1001,'María','Hernández','López','Docente','Ingeniería Mecatrónica','5551110002','maria.hernandez@univ.mx',NULL,'Activo'),(1002,'José','Martínez','Sánchez','Docente','Ingeniería Industrial','5551110003','jose.martinez@univ.mx',NULL,'Activo'),(1003,'Ana','Torres','Fernández','Docente','Ingeniería Civil','5551110004','ana.torres@univ.mx',NULL,'Activo'),(1004,'Luis','Gómez','Morales','Docente','Ingeniería en Software','5551110005','luis.gomez@univ.mx',NULL,'Activo'),(1005,'Patricia','Vargas','Cruz','Docente','Ingeniería Electrónica','5551110006','patricia.vargas@univ.mx',NULL,'Activo'),(1006,'Hugo','Flores','Reyes','Docente','Ingeniería Biomédica','5551110007','hugo.flores@univ.mx',NULL,'Activo'),(1007,'Elena','Moreno','Ríos','Docente','Ingeniería en Telecomunicaciones','5551110008','elena.moreno@univ.mx',NULL,'Activo'),(1008,'Ricardo','Díaz','Castro','Docente','Ingeniería Ambiental','5551110009','ricardo.diaz@univ.mx',NULL,'Activo'),(1009,'Laura','Silva','Jiménez','Docente','Ingeniería en Computación','5551110010','laura.silva@univ.mx',NULL,'Activo'),(1010,'Miguel','Ortega','Navarro','Administrador','Ingeniería en Sistemas Computacionales','5551110011','miguel.ortega@univ.mx',NULL,'Activo'),(1011,'Sofía','Luna','Delgado','Administrador','Ingeniería Industrial','5551110012','sofia.luna@univ.mx',NULL,'Activo'),(1012,'Fernando','Castañeda','Peña','Administrador','Ingeniería Civil','5551110013','fernando.castaneda@univ.mx',NULL,'Activo'),(1078,'Paulina Michelle ','Rivera','Castillo','administrativo','','2415448978','20222168@uatx.mx',NULL,'Activo'),(10232,'Paulina Michelle ','Rivera','Castillo','personal','Ingeniería  en computación','2415448978','20222168@uatx.mx',NULL,'Activo'),(20200001,'Daniel','García','López','Estudiante','Ingeniería en Sistemas Computacionales','5552220001','daniel.garcia2020@uni.mx',3,'Activo'),(20200002,'Andrea','Martínez','Hernández','Estudiante','Ingeniería Mecatrónica','5552220002','andrea.martinez2020@univ.mx',4,'Activo'),(20200003,'Pablo','Ramírez','Torres','Estudiante','Ingeniería Civil','5552220003','pablo.ramirez2020@univ.mx',6,'Activo'),(20200004,'Lucía','Vargas','Sánchez','Estudiante','Ingeniería Industrial','5552220004','lucia.vargas2020@univ.mx',5,'Activo'),(20210001,'Javier','Hernández','Gómez','Estudiante','Ingeniería en Software','5552220005','javier.hernandez2021@univ.mx',2,'Activo'),(20210002,'Valeria','Díaz','Morales','Estudiante','Ingeniería en Computación','5552220006','valeria.diaz2021@univ.mx',1,'Activo'),(20210003,'Alejandro','Cruz','Fernández','Estudiante','Ingeniería Electrónica','5552220007','alejandro.cruz2021@univ.mx',3,'Activo'),(20210004,'Camila','Flores','Reyes','Estudiante','Ingeniería Biomédica','5552220008','camila.flores2021@univ.mx',2,'Activo'),(20220001,'Marcos','Silva','Castro','Estudiante','Ingeniería Ambiental','5552220009','marcos.silva2022@univ.mx',1,'Activo'),(20220002,'Isabel','Moreno','Ríos','Estudiante','Ingeniería Industrial','5552220010','isabel.moreno2022@univ.mx',2,'Activo'),(20220003,'Rafael','Gómez','Jiménez','Estudiante','Ingeniería Mecatrónica','5552220011','rafael.gomez2022@univ.mx',3,'Activo'),(20220004,'Claudia','Ortega','Delgado','Estudiante','Ingeniería en Sistemas Computacionales','5552220012','claudia.ortega2022@univ.mx',4,'Activo'),(20222168,'Paulina Michelle','Rivera','Castillo','estudiante','Ingeniería  en computación','2415448978','20222168@uatx.mx',49,'Activo'),(20230001,'Manuel','Castañeda','Peña','Estudiante','Ingeniería Civil','5552220013','manuel.castaneda2023@univ.mx',1,'Activo'),(20230002,'Diana','Luna','Navarro','Estudiante','Ingeniería Biomédica','5552220014','diana.luna2023@univ.mx',2,'Activo'),(20230003,'Héctor','Díaz','Cruz','Estudiante','Ingeniería en Software','5552220015','hector.diaz2023@univ.mx',3,'Activo'),(20230004,'Adriana','Ramírez','Sánchez','Estudiante','Ingeniería Industrial','5552220016','adriana.ramirez2023@univ.mx',2,'Activo'),(20240001,'Gabriel','Martínez','Ríos','Estudiante','Ingeniería en Computación','5552220017','gabriel.martinez2024@univ.mx',1,'Activo'),(20240002,'Paola','García','Jiménez','Estudiante','Ingeniería en Sistemas Computacionales','5552220018','paola.garcia2024@univ.mx',2,'Activo'),(20240003,'Iván','Torres','Morales','Estudiante','Ingeniería Civil','5552220019','ivan.torres2024@univ.mx',1,'Activo'),(20240004,'Natalia','Vargas','Castro','Estudiante','Ingeniería Electrónica','5552220020','natalia.vargas2024@univ.mx',2,'Activo'),(20250001,'Óscar','Moreno','Delgado','Estudiante','Ingeniería Mecatrónica','5552220021','oscar.moreno2025@univ.mx',1,'Activo'),(20250002,'Fabiola','Flores','Navarro','Estudiante','Ingeniería Biomédica','5552220022','fabiola.flores2025@univ.mx',1,'Activo'),(20250003,'Esteban','Silva','Peña','Estudiante','Ingeniería Ambiental','5552220023','esteban.silva2025@univ.mx',1,'Activo'),(20250004,'Monica','Gómez','Ríos','Estudiante','Ingeniería en Software','5552220024','monica.gomez2025@univ.mx',1,'Activo'),(20250005,'Sebastián','Hernández','Cruz','Estudiante','Ingeniería en Computación','5552220025','sebastian.hernandez2025@univ.mx',1,'Activo'),(20250006,'Carolina','Ramírez','Jiménez','Estudiante','Ingeniería en Sistemas Computacionales','5552220026','carolina.ramirez2025@univ.mx',1,'Activo'),(54654654,'Paulina Michelle ','Rivera','Castillo','estudiante','Ingeniería  en computación','2415448978','20222168@uatx.mx',4,'Activo');
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

-- Dump completed on 2025-12-10  8:19:18
