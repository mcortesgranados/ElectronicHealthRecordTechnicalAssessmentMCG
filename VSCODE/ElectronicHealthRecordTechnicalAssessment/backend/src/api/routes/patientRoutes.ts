// src/api/routes/patientRoutes.ts
import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { PatientService } from '../../domain/services/PatientService';
import { PatientRepositoryImpl } from '../../domain/ports/PatientRepositoryImpl';

// Instantiate the repository, service, and controller
const patientRepository = new PatientRepositoryImpl();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

const router = Router();

/**
 * @route POST /patients
 * @description Creates a new patient entry.
 */
router.post('/patients', (req, res) => patientController.create(req, res));

/**
 * @route GET /patients/:id
 * @description Retrieves a specific patient by their unique ID.
 */
router.get('/patients/:id', (req, res) => patientController.getPatient(req, res));

export default router;
