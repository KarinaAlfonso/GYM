"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
// src/domain/entities/Exercise.entity.ts
class Exercise {
    constructor(id, name, muscle_group, description, equipment, caloriesBurnedAvg) {
        this.id = id;
        this.name = name;
        this.muscle_group = muscle_group;
        this.description = description;
        this.equipment = equipment;
        this.caloriesBurnedAvg = caloriesBurnedAvg;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.entity.js.map