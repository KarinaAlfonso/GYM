"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const routine_routes_1 = __importDefault(require("./infrastructure/routes/routine.routes"));
const health_routes_1 = __importDefault(require("./infrastructure/routes/health.routes"));
const exercise_routes_1 = __importDefault(require("./infrastructure/routes/exercise.routes"));
const logger_middleware_1 = require("./infrastructure/middlewares/logger.middleware");
const error_middleware_1 = require("./infrastructure/middlewares/error.middleware");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(logger_middleware_1.logger);
    app.use('/api/routines', routine_routes_1.default);
    app.use('/api/exercises', exercise_routes_1.default);
    // endpoints públicos de salud
    app.use('/', health_routes_1.default);
    app.use(error_middleware_1.errorMiddleware);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map