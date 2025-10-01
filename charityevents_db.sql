-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Gala Dinner','正式的慈善晚宴活动','2025-09-30 10:14:59'),(2,'Fun Run','趣味跑步筹款活动','2025-09-30 10:14:59'),(3,'Silent Auction','无声拍卖活动','2025-09-30 10:14:59'),(4,'Concert','慈善音乐会','2025-09-30 10:14:59'),(5,'Workshop','教育和工作坊活动','2025-09-30 10:14:59'),(6,'Community Fair','社区集市活动','2025-09-30 10:14:59');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `full_description` text,
  `category_id` int DEFAULT NULL,
  `organization_id` int DEFAULT NULL,
  `event_date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `venue_details` text,
  `ticket_price` decimal(10,2) DEFAULT '0.00',
  `goal_amount` decimal(10,2) NOT NULL,
  `current_amount` decimal(10,2) DEFAULT '0.00',
  `max_attendees` int DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_suspended` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'希望之光年度慈善晚宴','盛大的年度筹款晚宴','加入我们参加这个难忘的夜晚，享受精美的晚餐、鼓舞人心的演讲和精彩的娱乐表演。所有收益将用于支持贫困儿童的教育项目。',1,1,'2025-10-15 18:30:00','悉尼会议中心','Grand Ballroom, Level 3',150.00,50000.00,32500.00,300,'/images/gala-dinner.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(2,'城市趣味跑2025','5公里趣味跑步活动','穿上你的跑鞋，加入我们的5公里趣味跑！适合所有年龄和健身水平。包含T恤、奖牌和赛后茶点。',2,2,'2025-09-20 08:00:00','百年纪念公园','Main Entrance, Federation Way',25.00,20000.00,12500.00,500,'/images/fun-run.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(3,'艺术珍品无声拍卖','独家艺术珍品拍卖晚会','体验独特的艺术之夜，竞标来自本地和国际艺术家的独家作品。包含鸡尾酒和开胃小菜。',3,1,'2025-11-05 19:00:00','艺术画廊悉尼','Modern Art Wing',75.00,30000.00,18000.00,150,'/images/auction.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(4,'爱心音乐会之夜','本地音乐家慈善音乐会','享受由知名本地音乐家表演的古典和现代音乐之夜。所有收入将用于购买医疗设备。',4,2,'2025-10-28 19:30:00','悉尼歌剧院','Utzon Room',60.00,15000.00,8900.00,200,'/images/concert.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(5,'儿童编程工作坊','免费编程教育课程','为期一天的编程入门工作坊，教导孩子们基本的编程概念和创造性思维。',5,1,'2025-09-12 10:00:00','悉尼科技大学','Building 11, Room 302',0.00,5000.00,3200.00,30,'/images/workshop.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(6,'秋季社区集市','家庭友好的社区集市','享受美食、工艺品、游戏和娱乐活动。适合全家参与的美好周末活动。',6,1,'2025-09-25 10:00:00','海德公园','North of Archibald Fountain',5.00,8000.00,4500.00,1000,'/images/fair.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(7,'健康生活研讨会','营养和健康生活教育','学习如何通过健康的饮食和生活方式改善生活质量。包含健康午餐和资料包。',5,2,'2025-10-10 09:00:00','皇家植物园','The Calyx, Mrs Macquaries Road',20.00,6000.00,3800.00,80,'/images/seminar.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(8,'冬季慈善舞会','正式的冬季舞会筹款活动','穿上你最漂亮的礼服，加入我们的冬季慈善舞会。包含晚餐、舞蹈和抽奖活动。',1,2,'2025-06-20 19:00:00','星城酒店','Crystal Ballroom',120.00,40000.00,28500.00,250,'/images/ball.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(9,'海滩清洁日','社区海滩清洁环保活动','加入我们的海滩清洁活动，保护海洋环境。提供手套、袋子和茶点。',6,1,'2025-08-15 09:00:00','邦迪海滩','South End, near Icebergs',0.00,2000.00,1500.00,100,'/images/beach-clean.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59'),(10,'摄影展筹款','慈善摄影作品展览','欣赏和购买本地摄影师的精美作品。所有销售收益将捐赠给慈善项目。',3,2,'2025-07-22 10:00:00','Paddington艺术区','45 Oxford Street Gallery',10.00,12000.00,7500.00,120,'/images/photography.jpg',1,0,'2025-09-30 10:14:59','2025-09-30 10:14:59');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `mission_statement` text,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'希望之光慈善基金会','致力于帮助贫困儿童和家庭改善生活条件','通过教育和社区支持，为弱势群体创造更美好的未来','contact@hopelight.org','+61 2 1234 5678','123 Charity Street, Sydney NSW 2000','2025-09-30 10:14:59'),(2,'爱心援助组织','专注于医疗援助和健康促进的非营利组织','让每个人都能获得基本的医疗服务和健康知识','info@careaid.org','+61 3 9876 5432','456 Hope Avenue, Melbourne VIC 3000','2025-09-30 10:14:59');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `attendee_name` varchar(255) NOT NULL,
  `attendee_email` varchar(255) NOT NULL,
  `attendee_phone` varchar(50) DEFAULT NULL,
  `ticket_quantity` int DEFAULT '1',
  `total_amount` decimal(10,2) DEFAULT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-30 20:57:05
