/*
SQLyog Community v8.6 RC2
MySQL - 8.0.21 : Database - hackathon
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hackathon` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hackathon`;

/*Table structure for table `Ess` */

DROP TABLE IF EXISTS `Ess`;

CREATE TABLE `Ess` (
  `id` int NOT NULL AUTO_INCREMENT,
  `OFFICER_EMP_NO` varchar(20) DEFAULT NULL,
  `OFFICER_NAME` varchar(50) DEFAULT NULL,
  `OFFICER_DESIG_DESC` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `OFFICER_DEPT_CODE` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `OFFICER_MOBILE_NO` varchar(15) DEFAULT NULL,
  `EMAIL_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Table structure for table `OTP_Records` */

DROP TABLE IF EXISTS `OTP_Records`;

CREATE TABLE `OTP_Records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Team_Name` varchar(50) NOT NULL,
  `OTP_Code` varchar(10) NOT NULL,
  `Time_Stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Table structure for table `Projects` */

DROP TABLE IF EXISTS `Projects`;

CREATE TABLE `Projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Team_Name` varchar(50) DEFAULT NULL,
  `Project_Title` varchar(60) DEFAULT NULL,
  `Project_Description` varchar(200) DEFAULT NULL,
  `Round1_Presentation_Path` varchar(300) DEFAULT NULL,
  `Round2_SourceCode` varchar(300) DEFAULT NULL,
  `Round2_Presentation` varchar(300) DEFAULT NULL,
  `Round3_Final_Presentation` varchar(300) DEFAULT NULL,
  `Round1_Presentation_Name` varchar(300) DEFAULT NULL,
  `Round2_SourceCode_Name` varchar(300) DEFAULT NULL,
  `Round2_Presentation_Name` varchar(300) DEFAULT NULL,
  `Round3_Final_Presentation_Name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*Table structure for table `Teams` */

DROP TABLE IF EXISTS `Teams`;

CREATE TABLE `Teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Leader_ID` varchar(10) DEFAULT NULL,
  `Team_Name` varchar(100) DEFAULT NULL,
  `Mobile_Number` varchar(15) DEFAULT NULL,
  `Member2` varchar(10) DEFAULT NULL,
  `Member3` varchar(10) DEFAULT NULL,
  `Member4` varchar(10) DEFAULT NULL,
  `Joined_On` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Round_No` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Team_Name` (`Team_Name`),
  UNIQUE KEY `Mobile_Number` (`Mobile_Number`),
  UNIQUE KEY `Leader_ID` (`Leader_ID`),
  UNIQUE KEY `uc_unique_members` (`Leader_ID`,`Member2`,`Member3`,`Member4`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

/*Table structure for table `mst_accnts` */

DROP TABLE IF EXISTS `mst_accnts`;

CREATE TABLE `mst_accnts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Last_Login` timestamp NULL DEFAULT NULL,
  `Enabled` tinyint(1) DEFAULT '1',
  `Role_ID` int DEFAULT '1',
  `round_no` int DEFAULT '1',
  `Otp_Verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_Name` (`User_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;

/*Table structure for table `mst_team` */

DROP TABLE IF EXISTS `mst_team`;

CREATE TABLE `mst_team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Leader_Email` varchar(60) NOT NULL,
  `Leader_First_Name` varchar(30) NOT NULL,
  `Leader_Middle_Name` varchar(30) DEFAULT NULL,
  `Leader_last_Name` varchar(30) NOT NULL,
  `Leader_Project_Group` varchar(50) DEFAULT NULL,
  `Team_Name` varchar(50) NOT NULL,
  `Team_Member_Name_1` varchar(50) DEFAULT NULL,
  `Team_Member_Email_1` varchar(60) DEFAULT NULL,
  `Project_Group_1` varchar(60) DEFAULT NULL,
  `Team_Member_Name_2` varchar(60) DEFAULT NULL,
  `Team_Member_Email_2` varchar(60) DEFAULT NULL,
  `Project_Group_2` varchar(60) DEFAULT NULL,
  `Team_Member_Name_3` varchar(60) DEFAULT NULL,
  `Team_Member_Email_3` varchar(60) DEFAULT NULL,
  `Project_Group_3` varchar(60) DEFAULT NULL,
  `Registered_On` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Last_Updated` timestamp NULL DEFAULT NULL,
  `Enabled` tinyint(1) DEFAULT '1',
  `Project_Title` varchar(60) DEFAULT NULL,
  `Project_Description` varchar(200) DEFAULT NULL,
  `Mobile_Number` varchar(15) DEFAULT NULL,
  `RoundNo` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

/*Table structure for table `score_board` */

DROP TABLE IF EXISTS `score_board`;

CREATE TABLE `score_board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Team_Id` int NOT NULL,
  `Round_Num` tinyint DEFAULT NULL,
  `Innovation` int DEFAULT '0',
  `Complexity` int DEFAULT '0',
  `Impact` int DEFAULT '0',
  `Feasibility` int DEFAULT '0',
  `Presentation` int DEFAULT '0',
  `Last_Modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/* Procedure structure for procedure `register` */

/*!50003 DROP PROCEDURE IF EXISTS  `register` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`deba`@`10.64.8.153` PROCEDURE `register`(
  IN pass VARCHAR(255),
  IN Leader_Email VARCHAR(255),
  IN Leader_First_Name VARCHAR(255),
  IN Leader_Middle_Name VARCHAR(255),
  IN Leader_last_Name VARCHAR(255),
  IN Leader_Project_Group VARCHAR(255),
  IN Team_Name VARCHAR(255),
  IN Team_Member_Name_1 VARCHAR(255),
  IN Team_Member_Email_1 VARCHAR(255),
  IN Project_Group_1 VARCHAR(255),
  IN Team_Member_Name_2 VARCHAR(255),
  IN Team_Member_Email_2 VARCHAR(255),
  IN Project_Group_2 VARCHAR(255),
  IN Team_Member_Name_3 VARCHAR(255),
  IN Team_Member_Email_3 VARCHAR(255),
  IN Project_Group_3 VARCHAR(255),
  IN Mobile_Number VARCHAR(255)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SELECT 'Error inserting data';
  END;

  START TRANSACTION;

  INSERT INTO mst_accnts (User_Name, pass) VALUES (Team_Name, pass);
  INSERT INTO mst_team (
    Leader_Email,
    Leader_First_Name,
    Leader_Middle_Name,
    Leader_last_Name,
    Leader_Project_Group,
    Team_Name,
    Team_Member_Name_1,
    Team_Member_Email_1,
    Project_Group_1,
    Team_Member_Name_2,
    Team_Member_Email_2,
    Project_Group_2,
    Team_Member_Name_3,
    Team_Member_Email_3,
    Project_Group_3,
    Mobile_Number
  ) VALUES (
    Leader_Email,
    Leader_First_Name,
    Leader_Middle_Name,
    Leader_last_Name,
    Leader_Project_Group,
    Team_Name,
    Team_Member_Name_1,
    Team_Member_Email_1,
    Project_Group_1,
    Team_Member_Name_2,
    Team_Member_Email_2,
    Project_Group_2,
    Team_Member_Name_3,
    Team_Member_Email_3,
    Project_Group_3,
    Mobile_Number
  );

  COMMIT;
  SELECT 'Data inserted successfully';
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
