"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineExercise = void 0;
const typeorm_1 = require("typeorm");
const routine_model_1 = require("./routine.model");
const exercise_model_1 = require("./exercise.model");
let RoutineExercise = class RoutineExercise {
};
exports.RoutineExercise = RoutineExercise;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'routine_id', type: 'int' }),
    __metadata("design:type", Number)
], RoutineExercise.prototype, "routineId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'exercise_id', type: 'int' }),
    __metadata("design:type", Number)
], RoutineExercise.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => routine_model_1.Routine, routine => routine.exercises, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'routine_id' }),
    __metadata("design:type", routine_model_1.Routine)
], RoutineExercise.prototype, "routine", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_model_1.Exercise, exercise => exercise.routineConnections, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", exercise_model_1.Exercise)
], RoutineExercise.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sets', type: 'int', default: 3 }),
    __metadata("design:type", Number)
], RoutineExercise.prototype, "sets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reps', type: 'int', default: 10 }),
    __metadata("design:type", Number)
], RoutineExercise.prototype, "reps", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], RoutineExercise.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rest_time_sec', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], RoutineExercise.prototype, "rest_time_sec", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_in_routine', type: 'int' }),
    __metadata("design:type", Number)
], RoutineExercise.prototype, "orderInRoutine", void 0);
exports.RoutineExercise = RoutineExercise = __decorate([
    (0, typeorm_1.Entity)('routine_exercises')
], RoutineExercise);
//# sourceMappingURL=routineExercise.model.js.map