import { Request, Response } from 'express';

export class HealthController {
  check(req: Request, res: Response) {
    res.json({ status: 'ok', service: 'routine-service', timestamp: new Date() });
  }
}
