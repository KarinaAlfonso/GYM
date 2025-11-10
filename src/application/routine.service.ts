import { IRoutineRepository } from '../domain/repositories/IRoutineRepository';

export class RoutineService {
  constructor(private routineRepo: IRoutineRepository) {}

  async createRoutine(payload: any) {
    if (!payload.userId) throw { status: 400, message: 'userId is required' };
    return await this.routineRepo.create(payload);
  }

  async getRoutinesByUser(userId: number) {
    return await this.routineRepo.findByUserId(userId);
  }

  async getRoutineById(id: number) {
    const r = await this.routineRepo.findById(id);
    if (!r) throw { status: 404, message: 'Routine not found' };
    return r;
  }

  // update, delete...
}
