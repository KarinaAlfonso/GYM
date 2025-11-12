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
exports.Exercise = void 0;
const typeorm_1 = require("typeorm");
const routineExercise_model_1 = require("./routineExercise.model");
let Exercise = class Exercise {
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'exercise_id' }),
    __metadata("design:type", Number)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'muscle_group', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "muscle_group", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'equipment', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calories_burned_avg', type: 'decimal', precision: 6, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "calories_burned_avg", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => routineExercise_model_1.RoutineExercise, re => re.exercise),
    __metadata("design:type", Array)
], Exercise.prototype, "routineConnections", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)('exercises')
], Exercise);
//# sourceMappingURL=exercise.model.js.map