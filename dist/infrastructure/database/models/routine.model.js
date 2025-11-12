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
exports.Routine = void 0;
const typeorm_1 = require("typeorm");
//import { User } from '../../..'; // si necesitas referencia a User service solo por id
const routineExercise_model_1 = require("./routineExercise.model");
let Routine = class Routine {
};
exports.Routine = Routine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'routine_id' }),
    __metadata("design:type", Number)
], Routine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'int' }),
    __metadata("design:type", Number)
], Routine.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trainer_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Routine.prototype, "trainerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'routine_name', length: 100 }),
    __metadata("design:type", String)
], Routine.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_weeks', type: 'int' }),
    __metadata("design:type", Number)
], Routine.prototype, "durationWeeks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'difficulty', length: 20 }),
    __metadata("design:type", String)
], Routine.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'goal', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Routine.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Routine.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => routineExercise_model_1.RoutineExercise, re => re.routine, { cascade: true }),
    __metadata("design:type", Array)
], Routine.prototype, "exercises", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Routine.prototype, "createdAt", void 0);
exports.Routine = Routine = __decorate([
    (0, typeorm_1.Entity)('routines')
], Routine);
//# sourceMappingURL=routine.model.js.map