import { IExerciseRepository } from '../domain/repositories/IExerciseRepository';
import { IRoutineRepository } from '../domain/repositories/IRoutineRepository';

export class ExerciseService {
  constructor(private exerciseRepo: IExerciseRepository) {}

  async createExercise(payload: any) {
    if (!payload.name) throw { status: 400, message: 'name is required' };
    return await this.exerciseRepo.create(payload);
  }

  async getAll() {
    return await this.exerciseRepo.findAll();
  }

  async getById(id: number) {
    const exercise = await this.exerciseRepo.findById(id);
    if (!exercise) throw { status: 404, message: 'Exercise not found' };
    return exercise;
  }

  async update(id: number, payload: any) {
    const updated = await this.exerciseRepo.update(id, payload);
    if (!updated) throw { status: 404, message: 'Exercise not found' };
    return updated;
  }

  async delete(id: number) {
    await this.exerciseRepo.delete(id);
  }
}
