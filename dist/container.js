"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerFactory = void 0;
const routineRepositoryImpl_1 = require("./infrastructure/repositories/routineRepositoryImpl");
const routine_service_1 = require("./application/routine.service");
const routine_controller_1 = require("./infrastructure/controllers/routine.controller");
const exerciseRepositoryImpl_1 = require("./infrastructure/repositories/exerciseRepositoryImpl");
const exercise_service_1 = require("./application/exercise.service");
const exercise_controller_1 = require("./infrastructure/controllers/exercise.controller");
const containerFactory = () => {
    // Routine
    const routineRepository = new routineRepositoryImpl_1.RoutineRepositoryImpl();
    const routineService = new routine_service_1.RoutineService(routineRepository);
    const routineController = new routine_controller_1.RoutineController(routineService);
    // Exercise
    const exerciseRepository = new exerciseRepositoryImpl_1.ExerciseRepositoryImpl();
    const exerciseService = new exercise_service_1.ExerciseService(exerciseRepository);
    const exerciseController = new exercise_controller_1.ExerciseController(exerciseService);
    return {
        routineController,
        exerciseController,
    };
};
exports.containerFactory = containerFactory;
//# sourceMappingURL=container.js.map