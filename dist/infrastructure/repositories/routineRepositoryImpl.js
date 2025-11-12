"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineRepositoryImpl = void 0;
const routine_entity_1 = require("../../domain/entities/routine.entity");
const routineExercise_entity_1 = require("../../domain/entities/routineExercise.entity");
const exercise_entity_1 = require("../../domain/entities/exercise.entity");
const data_source_1 = require("../database/data_source");
const routine_model_1 = require("../database/models/routine.model");
const routineExercise_model_1 = require("../database/models/routineExercise.model");
class RoutineRepositoryImpl {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(routine_model_1.Routine);
        this.reRepo = data_source_1.AppDataSource.getRepository(routineExercise_model_1.RoutineExercise);
    }
    async create(routinePayload) {
        // Crear la rutina básica sin relaciones primero
        const { exercises: rePayloads, ...routineFields } = routinePayload;
        const entity = this.repo.create(routineFields);
        const saved = (await this.repo.save(entity));
        // Si vienen ejercicios en el payload, insertarlos en la tabla intermedia
        if (Array.isArray(rePayloads) && rePayloads.length) {
            const reEntities = rePayloads.map((r, idx) => {
                return this.reRepo.create({
                    routineId: saved.id,
                    exerciseId: r.exerciseId || r.exercise?.id,
                    sets: r.sets ?? 3,
                    reps: r.reps ?? 10,
                    weight: r.weight ?? null,
                    rest_time_sec: r.rest_time_sec ?? null,
                    orderInRoutine: r.orderInRoutine ?? (r.order_in_routine ?? (idx + 1)),
                });
            });
            await this.reRepo.save(reEntities);
        }
        const full = await this.findById(saved.id);
        if (!full)
            throw new Error('Failed to create routine');
        return full;
    }
    async findById(id) {
        const r = await this.repo.findOne({ where: { id }, relations: ['exercises', 'exercises.exercise'] });
        if (!r)
            return null;
        return this.toDomain(r);
    }
    async findByUserId(userId) {
        const rows = await this.repo.find({ where: { userId }, relations: ['exercises', 'exercises.exercise'] });
        return rows.map(r => this.toDomain(r));
    }
    async update(id, payload) {
        await this.repo.update({ id }, payload);
        const updated = await this.findById(id);
        if (!updated)
            throw new Error('Routine not found');
        return updated;
    }
    async delete(id) {
        await this.repo.delete({ id });
    }
    toDomain(r) {
        const exercises = (r.exercises || []).map(re => {
            const exModel = re.exercise;
            const exDomain = exModel ? new exercise_entity_1.Exercise(exModel.id, exModel.name, exModel.muscle_group ?? '', exModel.description ?? undefined, exModel.equipment ?? null, exModel.calories_burned_avg != null ? parseFloat(String(exModel.calories_burned_avg)) : null) : undefined;
            return new routineExercise_entity_1.RoutineExercise(re.exerciseId ?? 0, exDomain, re.sets, re.reps, re.weight != null ? parseFloat(String(re.weight)) : null, re.orderInRoutine ?? re.order_in_routine ?? null);
        });
        return new routine_entity_1.Routine(r.id, r.userId, r.name, r.durationWeeks, r.type, exercises, r.createdAt, r.trainerId ?? null, r.goal ?? null, r.status ?? null);
    }
}
exports.RoutineRepositoryImpl = RoutineRepositoryImpl;
//# sourceMappingURL=routineRepositoryImpl.js.map