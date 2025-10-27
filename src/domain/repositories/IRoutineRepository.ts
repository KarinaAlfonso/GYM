import { Routine } from '../entities/routine.entity';

export interface IRoutineRepository {
  create(routine: Partial<Routine>): Promise<Routine>;
  findById(id: number): Promise<Routine | null>;
  findByUserId(userId: number): Promise<Routine[]>;
  update(id: number, payload: Partial<Routine>): Promise<Routine>;
  delete(id: number): Promise<void>;
}
