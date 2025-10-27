import { IRoutineRepository } from '../../domain/repositories/IRoutineRepository';
import { Routine } from '../database/models/routine.model';
import { AppDataSource } from '../database/data_source';
import { Repository } from 'typeorm';

export class RoutineRepositoryImpl implements IRoutineRepository {
  private repo: Repository<Routine>;
  constructor() {
    this.repo = AppDataSource.getRepository(Routine);
  }

  async create(routine: Partial<Routine>) {
    const entity = this.repo.create(routine);
    return await this.repo.save(entity);
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['exercises', 'exercises.exercise'] });
  }

  async findByUserId(userId: number) {
    return await this.repo.find({ where: { userId }, relations: ['exercises', 'exercises.exercise'] });
  }

  async update(id: number, payload: Partial<Routine>) {
    await this.repo.update({ id }, payload);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Routine not found');
    return updated;
  }

  async delete(id: number) {
    await this.repo.delete({ id });
  }
}
