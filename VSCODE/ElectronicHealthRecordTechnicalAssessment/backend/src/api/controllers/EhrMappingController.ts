import { Request, Response } from "express";
import { EhrMappingService } from "../services/EhrMappingService";

export class EhrMappingController {
  constructor(private ehrMappingService: EhrMappingService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const ehrMapping = await this.ehrMappingService.createEhrMapping(req.body);
      res.status(201).json(ehrMapping);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
