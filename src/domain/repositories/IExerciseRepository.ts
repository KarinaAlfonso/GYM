// src/domain/repositories/IExerciseRepository.ts
import { Exercise } from '../entities/exercise.entity';

export interface IExerciseRepository {
  create(exercise: Partial<Exercise>): Promise<Exercise>;
  findById(id: number): Promise<Exercise | null>;
  findAll(): Promise<Exercise[]>;
  update(id: number, payload: Partial<Exercise>): Promise<Exercise>;
  delete(id: number): Promise<void>;
}
