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

  async removeExercise(id: number) {
    await this.repo.delete({ id });
  }

  async getExercisesByRoutine(routineId: number) {
    return await this.repo.find({
      where: { routine: { id: routineId } },
      relations: ['exercise'],
    });
  }
}
