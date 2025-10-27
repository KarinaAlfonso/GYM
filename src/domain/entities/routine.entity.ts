// src/domain/entities/Routine.entity.ts
import { RoutineExercise } from './routineExercise.entity';

export class Routine {
  constructor(
    public id: number,
    public userId: number,
    public name: string,
    public durationWeeks: number,
    public type: 'fuerza' | 'cardio' | 'mixto',
    public exercises: RoutineExercise[] = [],
    public createdAt?: Date
  ) {}
}
