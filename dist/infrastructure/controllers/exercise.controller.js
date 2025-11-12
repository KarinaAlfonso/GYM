"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseController = void 0;
class ExerciseController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res, next) => {
            try {
                const exercise = await this.service.createExercise(req.body);
                res.status(201).json({ success: true, data: exercise });
            }
            catch (err) {
                next(err);
            }
        };
        this.getAll = async (req, res, next) => {
            try {
                const data = await this.service.getAll();
                res.json({ success: true, data });
            }
            catch (err) {
                next(err);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                const exercise = await this.service.getById(id);
                res.json({ success: true, data: exercise });
            }
            catch (err) {
                next(err);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                const updated = await this.service.update(id, req.body);
                res.json({ success: true, data: updated });
            }
            catch (err) {
                next(err);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                await this.service.delete(id);
                res.status(204).end();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.ExerciseController = ExerciseController;
//# sourceMappingURL=exercise.controller.js.map