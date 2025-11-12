"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineMapper = void 0;
const routine_entity_1 = require("../../domain/entities/routine.entity");
const routineExercise_entity_1 = require("../../domain/entities/routineExercise.entity");
const exercise_entity_1 = require("../../domain/entities/exercise.entity");
class RoutineMapper {
    static toDomain(model) {
        const exercises = model.exercises?.map(re => new routineExercise_entity_1.RoutineExercise(re.routineId, new exercise_entity_1.Exercise(re.exercise.id, re.exercise.name, re.exercise.muscle_group ?? null, re.exercise.description ?? null, re.exercise.equipment ?? null, 
        // convert decimal string to number if necessary
        typeof re.exercise.calories_burned_avg === 'string' ? Number(re.exercise.calories_burned_avg) : (re.exercise.calories_burned_avg ?? null)), re.sets, re.reps, 
        // convert decimal string to number for weight
        typeof re.weight === 'string' ? Number(re.weight) : (re.weight ?? null), re.orderInRoutine)) ?? [];
        return new routine_entity_1.Routine(model.id, model.userId, model.name, model.durationWeeks, model.type, exercises, model.createdAt);
    }
    static toDomainList(models) {
        return models.map(m => this.toDomain(m));
    }
}
exports.RoutineMapper = RoutineMapper;
//# sourceMappingURL=RoutineMapper.js.map