"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseService = void 0;
class ExerciseService {
    constructor(exerciseRepo) {
        this.exerciseRepo = exerciseRepo;
    }
    async createExercise(payload) {
        if (!payload.name)
            throw { status: 400, message: 'name is required' };
        return await this.exerciseRepo.create(payload);
    }
    async getAll() {
        return await this.exerciseRepo.findAll();
    }
    async getById(id) {
        const exercise = await this.exerciseRepo.findById(id);
        if (!exercise)
            throw { status: 404, message: 'Exercise not found' };
        return exercise;
    }
    async update(id, payload) {
        const updated = await this.exerciseRepo.update(id, payload);
        if (!updated)
            throw { status: 404, message: 'Exercise not found' };
        return updated;
    }
    async delete(id) {
        await this.exerciseRepo.delete(id);
    }
}
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map