import { Request, Response } from "express";
import AuditLogService from "../services/AuditLogService";

export class AuditLogController {
  static async createLog(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, ehr_mapping_id, action, changes } = req.body;

      if (!user_id || !ehr_mapping_id || !action || !changes) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const log = await AuditLogService.createLog(user_id, ehr_mapping_id, action, changes);
      res.status(201).json({ message: "Log created successfully", log });
    } catch (error) {
      const err = error as Error; // 🔥 Fix applied
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }

  static async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await AuditLogService.getLogs();
      res.status(200).json({ logs });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }

  static async getLogById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const log = await AuditLogService.getLogById(id);

      if (!log) {
        res.status(404).json({ error: "Log not found" });
        return;
      }

      res.status(200).json({ log });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Internal Server Error", details: err.message || "Unknown error" });
    }
  }
}
