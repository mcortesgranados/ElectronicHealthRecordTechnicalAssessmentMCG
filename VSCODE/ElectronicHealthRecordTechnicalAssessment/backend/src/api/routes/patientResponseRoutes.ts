// Import the necessary dependencies: 
// 1. Router from 'express' to define the routing mechanism.
// 2. PatientResponseController from the application's controllers to handle the business logic of patient responses.
import { Router } from 'express';
import { PatientResponseController } from '../controllers/patientResponseController';

// Create an instance of the Express Router to define the routes and HTTP methods.
const router = Router();

// Instantiate the PatientResponseController, which contains the business logic for handling patient responses.
// The controller serves as an entry point for incoming requests related to patient responses.
const patientResponseController = new PatientResponseController();

// Define the route and its associated handler:
// POST /patient-responses: This route will be used to create a new patient response.
// The router maps the incoming POST request to the create method of the patientResponseController.
router.post('/patient-responses', patientResponseController.create);

// Export the router to be used in the application's main routing configuration.
// This helps in maintaining separation of concerns, as the router acts as an adapter between the 
// HTTP request and the internal application logic (controller).
export default router;
