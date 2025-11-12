import { AppDataSource } from '../infrastructure/database/data_source';
import { RoutineExercise } from '../infrastructure/database/models/routineExercise.model';
import { Repository } from 'typeorm';

export class RoutineExerciseService {
  private repo: Repository<RoutineExercise>;

  constructor() {
    this.repo = AppDataSource.getRepository(RoutineExercise);
  }

  async addExerciseToRoutine(payload: any) {
    const entity = this.repo.create(payload);
    return await this.repo.save(entity);
  }

  async removeExercise(keys: { routineId: number; exerciseId: number }) {
    // routine_exercises uses a composite primary key (routineId + exerciseId)
    await this.repo.delete({ routineId: keys.routineId, exerciseId: keys.exerciseId });
  }

  async getExercisesByRoutine(routineId: number) {
    return await this.repo.find({
      where: { routineId: routineId },
      relations: ['exercise'],
    });
  }
}
