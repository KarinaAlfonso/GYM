import { Request, Response, NextFunction } from 'express';
export const auth = (req: Request, res: Response, next: NextFunction) => {
  // placeholder: validar token en header
  next();
};
