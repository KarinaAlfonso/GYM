import express from 'express';
import routineRoutes from './infrastructure/routes/routine.routes';
import healthRoutes from './infrastructure/routes/health.routes';
import exerciseRoutes from './infrastructure/routes/exercise.routes';
import { logger } from './infrastructure/middlewares/logger.middleware';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(logger);

  app.use('/api/routines', routineRoutes);
  app.use('/api/exercises', exerciseRoutes);
  // endpoints públicos de salud
  app.use('/', healthRoutes);

  app.use(errorMiddleware);

  return app;
};
