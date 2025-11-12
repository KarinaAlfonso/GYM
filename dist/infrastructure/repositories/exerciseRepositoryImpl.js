"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseRepositoryImpl = void 0;
const exercise_model_1 = require("../database/models/exercise.model");
const exercise_entity_1 = require("../../domain/entities/exercise.entity");
const data_source_1 = require("../database/data_source");
class ExerciseRepositoryImpl {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(exercise_model_1.Exercise);
    }
    toDomain(m) {
        return new exercise_entity_1.Exercise(m.id, m.name, m.muscle_group ?? '', m.description ?? undefined, m.equipment ?? null, m.calories_burned_avg != null ? parseFloat(String(m.calories_burned_avg)) : null);
    }
    async create(exercise) {
        if (!(exercise.name || exercise.exercise_name)) {
            throw { status: 400, message: 'name is required' };
        }
        const entity = this.repo.create({
            // use class property names (TypeORM maps these to DB column names)
            name: exercise.name || exercise.exercise_name,
            muscle_group: exercise.muscle_group || exercise.muscleGroup || null,
            description: exercise.description ?? null,
            equipment: exercise.equipment ?? null,
            calories_burned_avg: exercise.calories_burned_avg ?? exercise.caloriesBurnedAvg ?? null,
        });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async findAll() {
        const rows = await this.repo.find();
        return rows.map(r => this.toDomain(r));
    }
    async findById(id) {
        const r = await this.repo.findOne({ where: { id } });
        return r ? this.toDomain(r) : null;
    }
    async update(id, payload) {
        await this.repo.update({ id }, {
            name: payload.name || payload.exercise_name,
            muscle_group: payload.muscle_group ?? payload.muscleGroup,
            description: payload.description,
            equipment: payload.equipment,
            calories_burned_avg: payload.calories_burned_avg ?? payload.caloriesBurnedAvg,
        });
        const updated = await this.findById(id);
        if (!updated)
            throw new Error('Exercise not found');
        return updated;
    }
    async delete(id) {
        await this.repo.delete({ id });
    }
}
exports.ExerciseRepositoryImpl = ExerciseRepositoryImpl;
//# sourceMappingURL=exerciseRepositoryImpl.js.map