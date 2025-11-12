import { IRoutineRepository } from '../domain/repositories/IRoutineRepository';

export class RoutineService {
  constructor(private routineRepo: IRoutineRepository) {}

  async createRoutine(payload: any) {
    // Accept either `userId` (domain naming) or `clientId` (init SQL naming)
    const userId = payload.userId ?? payload.clientId;
    if (!userId) throw { status: 400, message: 'clientId or userId is required' };

    // Normalize payload to the fields expected by the repository/model
    const normalized: any = {
      userId,
      trainerId: payload.trainerId ?? null,
      name: payload.routineName ?? payload.name,
      goal: payload.goal ?? null,
      type: payload.difficulty ?? payload.type,
      durationWeeks: payload.durationWeeks ?? payload.duration_weeks,
      status: payload.status ?? null,
      exercises: payload.exercises ?? []
    };

    return await this.routineRepo.create(normalized);
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
