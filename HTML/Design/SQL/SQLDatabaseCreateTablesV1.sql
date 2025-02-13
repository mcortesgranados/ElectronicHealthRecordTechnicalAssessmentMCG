-- Create the database
CREATE DATABASE ehr_system;
USE ehr_system;

-- Table: providers (Hospitals/Clinics)
CREATE TABLE providers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    ehr_system_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ehr_system_id) REFERENCES ehr_systems(id) ON DELETE SET NULL
);

-- Table: ehr_systems (EHR System configurations)
CREATE TABLE ehr_systems (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) UNIQUE NOT NULL,
    base_api_url TEXT NOT NULL,
    auth_config JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: patients (Patient demographics)
CREATE TABLE patients (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    provider_id CHAR(36),
    name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    dob DATE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    emergency_contact TEXT,
    insurance_provider VARCHAR(255),
    insurance_policy_number VARCHAR(255),
    primary_care_physician VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
);

-- Table: questions (Survey questions)
CREATE TABLE questions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    text TEXT NOT NULL,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: ehr_mappings (Mapping questions to EHR fields)
CREATE TABLE ehr_mappings (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    ehr_system_id CHAR(36),
    question_id CHAR(36),
    ehr_field VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ehr_system_id) REFERENCES ehr_systems(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Table: patient_responses (Patient answers)
CREATE TABLE patient_responses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id CHAR(36),
    question_id CHAR(36),
    answer TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Table: ehr_transactions (Tracking API calls to EHRs)
CREATE TABLE ehr_transactions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id CHAR(36),
    ehr_system_id CHAR(36),
    status ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL,
    response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (ehr_system_id) REFERENCES ehr_systems(id) ON DELETE CASCADE
);

-- Table: users (System users for managing mappings)
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('Admin', 'Clinician') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: audit_logs (Logs for changes in mappings)
CREATE TABLE audit_logs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36),
    ehr_mapping_id CHAR(36),
    action VARCHAR(255) NOT NULL,
    changes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (ehr_mapping_id) REFERENCES ehr_mappings(id) ON DELETE CASCADE
);

-- Indexes for performance optimization
CREATE INDEX idx_patient_provider ON patients(provider_id);
CREATE INDEX idx_response_patient_question ON patient_responses(patient_id, question_id);
CREATE INDEX idx_transactions_patient ON ehr_transactions(patient_id);
