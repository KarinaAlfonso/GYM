import { IRoutineRepository } from '../../domain/repositories/IRoutineRepository';
import { Routine as RoutineDomain } from '../../domain/entities/routine.entity';
import { RoutineExercise as RoutineExerciseDomain } from '../../domain/entities/routineExercise.entity';
import { Exercise as ExerciseDomain } from '../../domain/entities/exercise.entity';
import { AppDataSource } from '../database/data_source';
import { Repository } from 'typeorm';
import { Routine } from '../database/models/routine.model';
import { RoutineExercise } from '../database/models/routineExercise.model';
import { Exercise } from '../database/models/exercise.model';

export class RoutineRepositoryImpl implements IRoutineRepository {
  private repo: Repository<Routine>;
  private reRepo: Repository<RoutineExercise>;
  
  constructor() {
    this.repo = AppDataSource.getRepository(Routine);
    this.reRepo = AppDataSource.getRepository(RoutineExercise);
  }

  async create(routinePayload: Partial<RoutineDomain>): Promise<RoutineDomain> {
    // Crear la rutina básica sin relaciones primero
    const { exercises: rePayloads, ...routineFields } = routinePayload as any;
  const entity = this.repo.create(routineFields as any);
  const saved = (await this.repo.save(entity as any)) as any;

    // Si vienen ejercicios en el payload, insertarlos en la tabla intermedia
    if (Array.isArray(rePayloads) && rePayloads.length) {
      const reEntities = rePayloads.map((r: any, idx: number) => {
        return this.reRepo.create({
          routineId: saved.id,
          exerciseId: r.exerciseId || r.exercise?.id,
          sets: r.sets ?? 3,
          reps: r.reps ?? 10,
          weight: r.weight ?? null,
          rest_time_sec: r.rest_time_sec ?? null,
          orderInRoutine: r.orderInRoutine ?? (r.order_in_routine ?? (idx + 1)),
        } as any);
      });
      await this.reRepo.save(reEntities as any);
    }

    const full = await this.findById(saved.id);
    if (!full) throw new Error('Failed to create routine');
    return full;
  }

  async findById(id: number): Promise<RoutineDomain | null> {
    const r = await this.repo.findOne({ where: { id }, relations: ['exercises', 'exercises.exercise'] });
    if (!r) return null;
    return this.toDomain(r);
  }

  async findByUserId(userId: number): Promise<RoutineDomain[]> {
    const rows = await this.repo.find({ where: { userId }, relations: ['exercises', 'exercises.exercise'] });
    return rows.map(r => this.toDomain(r));
  }

  async update(id: number, payload: Partial<RoutineDomain>): Promise<RoutineDomain> {
    await this.repo.update({ id }, payload as any);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Routine not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }

  private toDomain(r: Routine): RoutineDomain {
    const exercises = (r.exercises || []).map(re => {
  const exModel: Exercise | undefined = (re as any).exercise;
  const exDomain = exModel ? new ExerciseDomain(exModel.id, exModel.name, exModel.muscle_group ?? '', exModel.description ?? undefined) : undefined as any;
  return new RoutineExerciseDomain((re as any).exerciseId ?? 0, exDomain as any, (re as any).sets, (re as any).reps, (re as any).weight ?? null, (re as any).orderInRoutine ?? (re as any).order_in_routine ?? null);
    });

    return new RoutineDomain(r.id, r.userId, r.name, r.durationWeeks, r.type as any, exercises as any, r.createdAt);
  }
}