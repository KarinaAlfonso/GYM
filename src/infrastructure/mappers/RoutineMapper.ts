import { Routine } from '../../domain/entities/routine.entity';
import { RoutineExercise } from '../../domain/entities/routineExercise.entity';
import { Exercise } from '../../domain/entities/exercise.entity';
import { Routine as RoutineModel } from '../database/models/routine.model';

export class RoutineMapper {
  static toDomain(model: RoutineModel): Routine {
    const exercises = model.exercises?.map(re => new RoutineExercise(
      re.id,
      new Exercise(
        re.exercise.id,
        re.exercise.name,
        re.exercise.muscle_group,
        re.exercise.description
      ),
      re.sets,
      re.reps,
      re.weight,
      re.orderInRoutine
    )) ?? [];

    return new Routine(
      model.id,
      model.userId,
      model.name,
      model.durationWeeks,
      model.type as 'fuerza' | 'cardio' | 'mixto',
      exercises,
      model.createdAt
    );
  }

  static toDomainList(models: RoutineModel[]): Routine[] {
    return models.map(m => this.toDomain(m));
  }
}
