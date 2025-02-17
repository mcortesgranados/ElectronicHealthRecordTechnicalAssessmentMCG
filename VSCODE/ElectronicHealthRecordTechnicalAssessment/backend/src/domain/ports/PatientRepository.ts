// src/domain/ports/PatientRepository.ts
import { Patient } from '../../infrastructure/db/models/Patient';

export interface PatientRepository {
  createPatient(patientData: any): Promise<Patient>;
  getPatientById(id: number): Promise<Patient | null>;
}
