import express from 'express';
import routineRoutes from './infrastructure/routes/routine.routes';
import { logger } from './infrastructure/middlewares/logger.middleware';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(logger);

  app.use('/api/routines', routineRoutes);

  app.use(errorMiddleware);

  return app;
};
