"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routine = void 0;
class Routine {
    constructor(id, userId, name, durationWeeks, type, exercises = [], createdAt, trainerId, goal, status) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.durationWeeks = durationWeeks;
        this.type = type;
        this.exercises = exercises;
        this.createdAt = createdAt;
        this.trainerId = trainerId;
        this.goal = goal;
        this.status = status;
    }
}
exports.Routine = Routine;
//# sourceMappingURL=routine.entity.js.map