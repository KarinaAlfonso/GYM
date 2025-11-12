import { Routine } from '../../domain/entities/routine.entity';
import { RoutineExercise } from '../../domain/entities/routineExercise.entity';
import { Exercise } from '../../domain/entities/exercise.entity';
import { Routine as RoutineModel } from '../database/models/routine.model';

export class RoutineMapper {
  static toDomain(model: RoutineModel): Routine {
    const exercises = model.exercises?.map(re => new RoutineExercise(
      re.routineId,
      new Exercise(
        re.exercise.id,
        re.exercise.name,
        re.exercise.muscle_group ?? null,
        re.exercise.description ?? null,
        re.exercise.equipment ?? null,
        // convert decimal string to number if necessary
        typeof re.exercise.calories_burned_avg === 'string' ? Number(re.exercise.calories_burned_avg) : (re.exercise.calories_burned_avg ?? null)
      ),
      re.sets,
      re.reps,
      // convert decimal string to number for weight
      typeof re.weight === 'string' ? Number(re.weight) : (re.weight ?? null),
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
