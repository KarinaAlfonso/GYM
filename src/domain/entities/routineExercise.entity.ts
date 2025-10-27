// src/domain/entities/RoutineExercise.entity.ts
import { Exercise } from './exercise.entity';

export class RoutineExercise {
  constructor(
    public id: number,
    public exercise: Exercise,
    public sets: number,
    public reps: number,
    public weight?: number | null,
    public orderInRoutine?: number | null
  ) {}
}
