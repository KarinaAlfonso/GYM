import { RoutineRepositoryImpl } from './infrastructure/repositories/routineRepositoryImpl';
import { RoutineService } from './application/routine.service';
import { RoutineController } from './infrastructure/controllers/routine.controller';

import { ExerciseRepositoryImpl } from './infrastructure/repositories/exerciseRepositoryImpl';
import { ExerciseService } from './application/exercise.service';
import { ExerciseController } from './infrastructure/controllers/exercise.controller';

export const containerFactory = () => {
  // Routine
  const routineRepository = new RoutineRepositoryImpl();
  const routineService = new RoutineService(routineRepository);
  const routineController = new RoutineController(routineService);

  // Exercise
  const exerciseRepository = new ExerciseRepositoryImpl();
  const exerciseService = new ExerciseService(exerciseRepository);
  const exerciseController = new ExerciseController(exerciseService);

  return {
    routineController,
    exerciseController,
  };
};
