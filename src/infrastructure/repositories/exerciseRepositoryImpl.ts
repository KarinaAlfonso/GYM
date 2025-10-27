import { IExerciseRepository } from '../../domain/repositories/IExerciseRepositoy';
import { Exercise } from '../database/models/exercise.model';
import { AppDataSource } from '../database/data_source';
import { Repository } from 'typeorm';

export class ExerciseRepositoryImpl implements IExerciseRepository {
  private repo: Repository<Exercise>;
  constructor() {
    this.repo = AppDataSource.getRepository(Exercise);
  }

  async create(exercise: Partial<Exercise>) {
    const entity = this.repo.create(exercise);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, payload: Partial<Exercise>) {
    await this.repo.update({ id }, payload);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Exercise not found');
    return updated;
  }

  async delete(id: number) {
    await this.repo.delete({ id });
  }
}
