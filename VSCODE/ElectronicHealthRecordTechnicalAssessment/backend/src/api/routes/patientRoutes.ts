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
 * 
 * ## Role in Hexagonal Architecture:
 * - **Web Layer (Adapter)**: This route acts as the entry point for HTTP requests coming from external clients (e.g., frontend).
 * - It is an **adapter** that translates external HTTP requests into the corresponding service method, in this case, calling the `create` method on `PatientController`.
 * - The route does not contain any business logic; it simply delegates the processing to the **Application Layer** via `PatientController`.
 * - The **Application Layer** (through the `PatientService`) handles the creation logic, ensuring business rules are followed.
 * 
 * ## Why It Exists:
 * - To provide an HTTP interface for creating a new patient in the system.
 * - The route is decoupled from the business logic, allowing flexibility in handling patient data.
 */
router.post('/patients', (req, res) => patientController.create(req, res));

/**
 * @route GET /patients/:id
 * @description Retrieves a specific patient by their unique ID.
 * 
 * ## Role in Hexagonal Architecture:
 * - **Web Layer (Adapter)**: This route acts as the adapter that transforms the HTTP request into a call to the **Application Layer** via `PatientController`.
 * - It does not perform any logic beyond routing the request. It delegates the operation to the `PatientService` via the controller.
 * - The **Application Layer** is responsible for handling the retrieval of a patient's data and enforcing the business rules.
 * 
 * ## Why It Exists:
 * - To provide an HTTP interface for retrieving a patient by their unique ID.
 * - This route allows external clients to query the system for specific patient data without exposing any internal logic.
 */
router.get('/patients/:id', (req, res) => patientController.getPatient(req, res));

export default router;
