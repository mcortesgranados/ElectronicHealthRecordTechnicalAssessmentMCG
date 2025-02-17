/**
 * PatientResponseDTO is a Data Transfer Object (DTO) used in the system to structure the response
 * for patient data. This object plays a key role in Hexagonal Architecture as part of the boundary 
 * between the core business logic and the external systems (like EHR systems).
 * 
 * In Hexagonal Architecture:
 * - The `PatientResponseDTO` is a part of the **application layer** that interacts with external 
 *   systems such as Electronic Health Record (EHR) systems.
 * - It represents the data structure that is exchanged between the core domain logic and the 
 *   external adapters (inbound or outbound). 
 * - The `PatientResponseDTO` is a **contract** that defines how patient data is returned to the 
 *   external systems, ensuring consistency and decoupling from the underlying implementation details.
 * 
 * Attributes:
 * - `patient_id`: The unique identifier of the patient.
 * - `ehr_system`: The name or identifier of the EHR system that the data is being mapped from.
 * - `mapped_data`: A string containing the patient data, potentially in a mapped or transformed format.
 * - `submitted_at`: An optional field capturing the date when the data was submitted, providing 
 *   auditability and traceability of the data.
 * 
 * The DTO helps ensure that the core domain logic is agnostic to the external systems' specifics 
 * while still allowing communication with them.
 */
export interface PatientResponseDTO {
  patient_id: number;
  ehr_system: string;
  mapped_data: string;
  submitted_at?: Date;
}
