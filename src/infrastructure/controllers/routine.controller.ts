import { Request, Response, NextFunction } from 'express';
import { RoutineService } from '../../application/routine.service';

export class RoutineController {
  constructor(private service: RoutineService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.createRoutine(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (err) { next(err); }
  };

  getByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const routines = await this.service.getRoutinesByUser(userId);
      res.json({ success: true, data: routines });
    } catch (err) { next(err); }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const r = await this.service.getRoutineById(id);
      res.json({ success: true, data: r });
    } catch (err) { next(err); }
  };
}
