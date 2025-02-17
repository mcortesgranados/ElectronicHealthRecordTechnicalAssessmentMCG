import { Request, Response } from 'express';
import { PatientResponseService } from '../services/patientResponseService';
import { PatientResponseDTO } from '../dtos/patientResponse.dto';

const patientResponseService = new PatientResponseService();

export class PatientResponseController {
  public async create(req: Request, res: Response): Promise<void> {
    const patientResponseDTO: PatientResponseDTO = req.body;
    
    try {
      const response = await patientResponseService.create(patientResponseDTO);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Error creating patient response', error });
    }
  }
}
