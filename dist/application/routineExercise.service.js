"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineExerciseService = void 0;
const data_source_1 = require("../infrastructure/database/data_source");
const routineExercise_model_1 = require("../infrastructure/database/models/routineExercise.model");
class RoutineExerciseService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(routineExercise_model_1.RoutineExercise);
    }
    async addExerciseToRoutine(payload) {
        const entity = this.repo.create(payload);
        return await this.repo.save(entity);
    }
    async removeExercise(keys) {
        // routine_exercises uses a composite primary key (routineId + exerciseId)
        await this.repo.delete({ routineId: keys.routineId, exerciseId: keys.exerciseId });
    }
    async getExercisesByRoutine(routineId) {
        return await this.repo.find({
            where: { routineId: routineId },
            relations: ['exercise'],
        });
    }
}
exports.RoutineExerciseService = RoutineExerciseService;
//# sourceMappingURL=routineExercise.service.js.map