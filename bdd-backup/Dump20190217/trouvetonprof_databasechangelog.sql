-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: trouvetonprof
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangelog`
--

LOCK TABLES `databasechangelog` WRITE;
/*!40000 ALTER TABLE `databasechangelog` DISABLE KEYS */;
INSERT INTO `databasechangelog` VALUES ('00000000000001','jhipster','config/liquibase/changelog/00000000000000_initial_schema.xml','2019-02-16 20:14:53',1,'EXECUTED','7:d0cd1302989c6efb4825ee67ea9f9549','createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; addForeignKeyConstraint baseTableName=jhi_user_authority, constraintName=fk_authority_name, ...','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132703-1','jhipster','config/liquibase/changelog/20190203132703_added_entity_Profil.xml','2019-02-16 20:14:54',2,'EXECUTED','7:00ab02eda418f29ecbee1b8eeb0b56cc','createTable tableName=profil; dropDefaultValue columnName=date_naissance, tableName=profil','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132704-1','jhipster','config/liquibase/changelog/20190203132704_added_entity_Annonce.xml','2019-02-16 20:14:55',3,'EXECUTED','7:7211b4350c6f73966e15a4040e9ec506','createTable tableName=annonce','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132705-1','jhipster','config/liquibase/changelog/20190203132705_added_entity_Disponibilite.xml','2019-02-16 20:14:55',4,'EXECUTED','7:80c849fc9bb0f6bf1d27b71054d9f93a','createTable tableName=disponibilite; dropDefaultValue columnName=jhi_date, tableName=disponibilite','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132706-1','jhipster','config/liquibase/changelog/20190203132706_added_entity_Domaine.xml','2019-02-16 20:14:56',5,'EXECUTED','7:d1a170850aedb81c9f85a8c2b688f441','createTable tableName=domaine','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132707-1','jhipster','config/liquibase/changelog/20190203132707_added_entity_Matiere.xml','2019-02-16 20:14:57',6,'EXECUTED','7:e64861346b7328a636d024b9b4fde73e','createTable tableName=matiere','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132708-1','jhipster','config/liquibase/changelog/20190203132708_added_entity_Message.xml','2019-02-16 20:14:58',7,'EXECUTED','7:0830117eb4bda01de7a5c90aa8691dc2','createTable tableName=message; dropDefaultValue columnName=jhi_date, tableName=message','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190205091641-1','jhipster','config/liquibase/changelog/20190205091641_added_entity_Cours.xml','2019-02-16 20:14:59',8,'EXECUTED','7:b2c30473f2d8a59e472e510a48075e06','createTable tableName=cours; dropDefaultValue columnName=jhi_date, tableName=cours','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132703-2','jhipster','config/liquibase/changelog/20190203132703_added_entity_constraints_Profil.xml','2019-02-16 20:15:02',9,'EXECUTED','7:0eba917cda168b25ca2aeda3e1353681','addForeignKeyConstraint baseTableName=profil, constraintName=fk_profil_user_id, referencedTableName=jhi_user; addForeignKeyConstraint baseTableName=profil, constraintName=fk_profil_cours_id, referencedTableName=cours','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132704-2','jhipster','config/liquibase/changelog/20190203132704_added_entity_constraints_Annonce.xml','2019-02-16 20:15:05',10,'EXECUTED','7:05be06520d4f665417b9dfda1f309130','addForeignKeyConstraint baseTableName=annonce, constraintName=fk_annonce_profil_id, referencedTableName=profil; addForeignKeyConstraint baseTableName=annonce, constraintName=fk_annonce_domaine_id, referencedTableName=domaine','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132705-2','jhipster','config/liquibase/changelog/20190203132705_added_entity_constraints_Disponibilite.xml','2019-02-16 20:15:07',11,'EXECUTED','7:3f0628fbff0cc1a460be4829ec5d0e0b','addForeignKeyConstraint baseTableName=disponibilite, constraintName=fk_disponibilite_annonce_id, referencedTableName=annonce','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132707-2','jhipster','config/liquibase/changelog/20190203132707_added_entity_constraints_Matiere.xml','2019-02-16 20:15:09',12,'EXECUTED','7:d2a0b98e82507b1ec7d7d09c679d49ef','addForeignKeyConstraint baseTableName=matiere, constraintName=fk_matiere_domaine_id, referencedTableName=domaine','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190203132708-2','jhipster','config/liquibase/changelog/20190203132708_added_entity_constraints_Message.xml','2019-02-16 20:15:10',13,'EXECUTED','7:ca47fb1c9e225c766c8f724a863ff1da','addForeignKeyConstraint baseTableName=message, constraintName=fk_message_profil_id, referencedTableName=profil','',NULL,'3.5.4',NULL,NULL,'0344483111'),('20190205091641-2','jhipster','config/liquibase/changelog/20190205091641_added_entity_constraints_Cours.xml','2019-02-16 20:15:15',14,'EXECUTED','7:142972e711e774b93c1398368aff0a44','addForeignKeyConstraint baseTableName=cours, constraintName=fk_cours_annonce_id, referencedTableName=annonce; addForeignKeyConstraint baseTableName=cours, constraintName=fk_cours_cours_id, referencedTableName=profil','',NULL,'3.5.4',NULL,NULL,'0344483111');
/*!40000 ALTER TABLE `databasechangelog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-17 22:30:04
