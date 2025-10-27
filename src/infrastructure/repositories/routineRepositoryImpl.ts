import { IRoutineRepository } from '../../domain/repositories/IRoutineRepository';
import { Routine } from '../../domain/entities/routine.entity'; // Cambiar el import
import { AppDataSource } from '../database/data_source';
import { Repository } from 'typeorm';

export class RoutineRepositoryImpl implements IRoutineRepository {
  private repo: Repository<Routine>;
  
  constructor() {
    this.repo = AppDataSource.getRepository(Routine);
  }

  async create(routine: Partial<Routine>): Promise<Routine> {
    const entity = this.repo.create(routine);
    return await this.repo.save(entity);
  }

  async findById(id: number): Promise<Routine | null> {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ['routineExercises', 'routineExercises.exercise'] 
    });
  }

  async findByUserId(userId: number): Promise<Routine[]> {
    return await this.repo.find({ 
      where: { userId }, 
      relations: ['routineExercises', 'routineExercises.exercise'] 
    });
  }

  async update(id: number, payload: Partial<Routine>): Promise<Routine> {
    await this.repo.update({ id }, payload);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Routine not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}