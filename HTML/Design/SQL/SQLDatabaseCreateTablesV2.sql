-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.2.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla ehr_system.audit_logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `ehr_mapping_id` char(36) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `changes` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.audit_logs: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.ehr_mappings
CREATE TABLE IF NOT EXISTS `ehr_mappings` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for mapping (e.g., 1)',
  `ehr_name` varchar(255) NOT NULL COMMENT 'EHR system name (e.g., "AthenaHealth")',
  `question_key` varchar(255) NOT NULL COMMENT 'Unique question identifier (e.g., "patient_allergy")',
  `ehr_field` varchar(255) NOT NULL COMMENT 'Corresponding field in the EHR (e.g., "allergy_list")',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp (e.g., "2024-02-12 10:00:00")',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record update timestamp (e.g., "2024-02-12 12:00:00")',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ehr_name` (`ehr_name`,`question_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Mappings for patient responses to EHR system fields (Req: 3.1.1, 3.1.5)';

-- Volcando datos para la tabla ehr_system.ehr_mappings: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.ehr_systems
CREATE TABLE IF NOT EXISTS `ehr_systems` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `base_api_url` text NOT NULL,
  `auth_config` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.ehr_systems: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.ehr_transactions
CREATE TABLE IF NOT EXISTS `ehr_transactions` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `patient_id` int DEFAULT NULL,
  `ehr_system_id` char(36) DEFAULT NULL,
  `status` enum('PENDING','SUCCESS','FAILED') NOT NULL,
  `response` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_ehr_transactions_patients` (`patient_id`),
  KEY `FK_ehr_transactions_ehr_systems` (`ehr_system_id`),
  CONSTRAINT `FK_ehr_transactions_ehr_systems` FOREIGN KEY (`ehr_system_id`) REFERENCES `ehr_systems` (`id`),
  CONSTRAINT `FK_ehr_transactions_patients` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.ehr_transactions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.ehr_transmissions
CREATE TABLE IF NOT EXISTS `ehr_transmissions` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique transmission identifier (e.g., 1001)',
  `patient_id` int NOT NULL COMMENT 'Reference to patients table (e.g., 101)',
  `ehr_name` varchar(255) NOT NULL COMMENT 'Target EHR system (e.g., "Cerner")',
  `status` enum('Pending','Success','Failed') NOT NULL DEFAULT 'Pending' COMMENT 'Transmission status (e.g., "Success")',
  `response` text COMMENT 'API response from EHR system (e.g., "Patient record successfully created")',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp (e.g., "2024-02-12 12:00:00")',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp (e.g., "2024-02-12 12:30:00")',
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `ehr_transmissions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tracks patient data transmissions to EHR systems (Req: 3.1.3)';

-- Volcando datos para la tabla ehr_system.ehr_transmissions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.error_logs
CREATE TABLE IF NOT EXISTS `error_logs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique error log identifier (e.g., 5001)',
  `endpoint` varchar(255) NOT NULL COMMENT 'API endpoint where error occurred (e.g., "/api/send_patient_data")',
  `error_message` text NOT NULL COMMENT 'Error message (e.g., "Invalid JSON format")',
  `stack_trace` text COMMENT 'Detailed error trace (e.g., "Exception at line 42")',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Error occurrence timestamp (e.g., "2024-02-12 13:00:00")',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Logs errors occurring during API interactions (Req: 3.1.6)';

-- Volcando datos para la tabla ehr_system.error_logs: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.localization
CREATE TABLE IF NOT EXISTS `localization` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique translation identifier (e.g., 8001)',
  `language_code` varchar(10) NOT NULL COMMENT 'Language code (e.g., "es" for Spanish)',
  `question_key` varchar(255) NOT NULL COMMENT 'Identifier for the question (e.g., "patient_allergy")',
  `translated_text` text NOT NULL COMMENT 'Translated text (e.g., "Alergias del paciente")',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp (e.g., "2024-02-12 15:00:00")',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp (e.g., "2024-02-12 15:30:00")',
  PRIMARY KEY (`id`),
  UNIQUE KEY `language_code` (`language_code`,`question_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores multi-language question translations (Req: 3.1.8)';

-- Volcando datos para la tabla ehr_system.localization: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.patients
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique patient identifier (e.g., 101)',
  `name` varchar(255) NOT NULL COMMENT 'Full name of the patient (e.g., "John Doe")',
  `gender` enum('Male','Female','Other') NOT NULL COMMENT 'Gender (e.g., "Male")',
  `dob` date NOT NULL COMMENT 'Date of birth (e.g., "1985-06-15")',
  `address` text COMMENT 'Residential address (e.g., "123 Main St, Springfield")',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Contact number (e.g., "+1-555-1234")',
  `email` varchar(255) DEFAULT NULL COMMENT 'Email address (e.g., "john.doe@example.com")',
  `emergency_contact` varchar(255) DEFAULT NULL COMMENT 'Emergency contact details (e.g., "Jane Doe, +1-555-5678")',
  `insurance_provider` varchar(255) DEFAULT NULL COMMENT 'Name of insurance provider (e.g., "BlueCross")',
  `insurance_policy_number` varchar(50) DEFAULT NULL COMMENT 'Insurance policy number (e.g., "BC123456789")',
  `primary_care_physician` varchar(255) DEFAULT NULL COMMENT 'Assigned doctor (e.g., "Dr. Emily Carter")',
  `allergies` text COMMENT 'List of allergies (e.g., "Peanuts, Penicillin")',
  `current_medications` text COMMENT 'Medications patient is currently taking (e.g., "Metformin, Lisinopril")',
  `medical_history` text COMMENT 'Past medical conditions (e.g., "Diabetes, Hypertension")',
  `social_history` text COMMENT 'Social habits like smoking, alcohol use (e.g., "Non-smoker, occasional drinker")',
  `family_history` text COMMENT 'Family medical history (e.g., "Father: Heart disease, Mother: Asthma")',
  `ehr_name` varchar(255) NOT NULL COMMENT 'EHR system where data will be sent (e.g., "Epic")',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp (e.g., "2024-02-12 10:30:00")',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp (e.g., "2024-02-12 11:00:00")',
  `id_provider` char(36) DEFAULT NULL,
  `id_system` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_patients_ehr_systems` (`id_system`),
  KEY `FK_patients_providers` (`id_provider`),
  CONSTRAINT `FK_patients_ehr_systems` FOREIGN KEY (`id_system`) REFERENCES `ehr_systems` (`id`),
  CONSTRAINT `FK_patients_providers` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores patient data before EHR transmission (Req: 3.1.2, 3.1.5)';

-- Volcando datos para la tabla ehr_system.patients: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.patient_responses
CREATE TABLE IF NOT EXISTS `patient_responses` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `patient_id` int DEFAULT NULL,
  `question_id` char(36) DEFAULT NULL,
  `answer` text NOT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_patient_responses_patients` (`patient_id`),
  KEY `FK_patient_responses_questions` (`question_id`),
  CONSTRAINT `FK_patient_responses_patients` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `FK_patient_responses_questions` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.patient_responses: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.performance_metrics
CREATE TABLE IF NOT EXISTS `performance_metrics` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique metric identifier (e.g., 7001)',
  `endpoint` varchar(255) NOT NULL COMMENT 'API endpoint measured (e.g., "/api/send_patient_data")',
  `response_time_ms` int NOT NULL COMMENT 'Response time in milliseconds (e.g., 250)',
  `request_count` int NOT NULL COMMENT 'Total requests processed (e.g., 500)',
  `error_count` int DEFAULT '0' COMMENT 'Number of errors encountered (e.g., 5)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Metric recording timestamp (e.g., "2024-02-12 14:00:00")',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Records API response time and errors (Req: 3.1.7)';

-- Volcando datos para la tabla ehr_system.performance_metrics: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.providers
CREATE TABLE IF NOT EXISTS `providers` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `ehr_system_id` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.providers: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `text` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.questions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ehr_system.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` text NOT NULL,
  `role` enum('Admin','Clinician') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ehr_system.users: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
