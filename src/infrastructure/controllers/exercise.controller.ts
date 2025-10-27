import { Request, Response, NextFunction } from 'express';
import { ExerciseService } from '../../application/exercise.service';

export class ExerciseController {
  constructor(private service: ExerciseService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exercise = await this.service.createExercise(req.body);
      res.status(201).json({ success: true, data: exercise });
    } catch (err) { next(err); }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const exercise = await this.service.getById(id);
      res.json({ success: true, data: exercise });
    } catch (err) { next(err); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updated = await this.service.update(id, req.body);
      res.json({ success: true, data: updated });
    } catch (err) { next(err); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.service.delete(id);
      res.status(204).end();
    } catch (err) { next(err); }
  };
}
