"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineController = void 0;
class RoutineController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res, next) => {
            try {
                const created = await this.service.createRoutine(req.body);
                res.status(201).json({ success: true, data: created });
            }
            catch (err) {
                next(err);
            }
        };
        this.getByUser = async (req, res, next) => {
            try {
                const userId = parseInt(req.params.userId, 10);
                const routines = await this.service.getRoutinesByUser(userId);
                res.json({ success: true, data: routines });
            }
            catch (err) {
                next(err);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                const r = await this.service.getRoutineById(id);
                res.json({ success: true, data: r });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.RoutineController = RoutineController;
//# sourceMappingURL=routine.controller.js.map