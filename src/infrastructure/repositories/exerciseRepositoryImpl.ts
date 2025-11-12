import { IExerciseRepository } from '../../domain/repositories/IExerciseRepositoy';
import { Exercise as ExerciseModel } from '../database/models/exercise.model';
import { Exercise } from '../../domain/entities/exercise.entity';
import { AppDataSource } from '../database/data_source';
import { Repository } from 'typeorm';

export class ExerciseRepositoryImpl implements IExerciseRepository {
  private repo: Repository<ExerciseModel>;
  constructor() {
    this.repo = AppDataSource.getRepository(ExerciseModel);
  }

  private toDomain(m: ExerciseModel): Exercise {
    return new Exercise(
      m.id,
      m.name,
      m.muscle_group ?? '',
      m.description ?? undefined,
      m.equipment ?? null,
      m.calories_burned_avg != null ? parseFloat(String(m.calories_burned_avg)) : null
    );
  }

  async create(exercise: Partial<Exercise>) {
    if (!((exercise as any).name || (exercise as any).exercise_name)) {
      throw { status: 400, message: 'name is required' };
    }
    const entity = this.repo.create({
      // use class property names (TypeORM maps these to DB column names)
      name: (exercise as any).name || (exercise as any).exercise_name,
      muscle_group: (exercise as any).muscle_group || (exercise as any).muscleGroup || null,
      description: (exercise as any).description ?? null,
      equipment: (exercise as any).equipment ?? null,
      calories_burned_avg: (exercise as any).calories_burned_avg ?? (exercise as any).caloriesBurnedAvg ?? null,
    } as Partial<ExerciseModel>);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async findAll() {
    const rows = await this.repo.find();
    return rows.map(r => this.toDomain(r));
  }

  async findById(id: number) {
    const r = await this.repo.findOne({ where: { id } });
    return r ? this.toDomain(r) : null;
  }

  async update(id: number, payload: Partial<Exercise>) {
    await this.repo.update({ id }, {
      name: (payload as any).name || (payload as any).exercise_name,
      muscle_group: (payload as any).muscle_group ?? (payload as any).muscleGroup,
      description: (payload as any).description,
      equipment: (payload as any).equipment,
      calories_burned_avg: (payload as any).calories_burned_avg ?? (payload as any).caloriesBurnedAvg,
    } as Partial<ExerciseModel>);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Exercise not found');
    return updated;
  }

  async delete(id: number) {
    await this.repo.delete({ id });
  }
}
