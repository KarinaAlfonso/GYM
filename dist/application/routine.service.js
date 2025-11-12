"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineService = void 0;
class RoutineService {
    constructor(routineRepo) {
        this.routineRepo = routineRepo;
    }
    async createRoutine(payload) {
        if (!payload.userId)
            throw { status: 400, message: 'userId is required' };
        return await this.routineRepo.create(payload);
    }
    async getRoutinesByUser(userId) {
        return await this.routineRepo.findByUserId(userId);
    }
    async getRoutineById(id) {
        const r = await this.routineRepo.findById(id);
        if (!r)
            throw { status: 404, message: 'Routine not found' };
        return r;
    }
}
exports.RoutineService = RoutineService;
//# sourceMappingURL=routine.service.js.map