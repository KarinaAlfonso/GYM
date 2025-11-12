"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const routine_model_1 = require("./models/routine.model");
const exercise_model_1 = require("./models/exercise.model");
const routineExercise_model_1 = require("./models/routineExercise.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_TYPE = (process.env.DB_TYPE || 'postgres').toLowerCase();
const isProduction = process.env.NODE_ENV === 'production';
function parsePort(p, defaultPort) {
    if (!p)
        return defaultPort;
    const n = Number(p);
    return Number.isNaN(n) ? defaultPort : n;
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: DB_TYPE,
    host: process.env.DB_HOST || (DB_TYPE === 'postgres' ? 'localhost' : 'localhost'),
    port: parsePort(process.env.DB_PORT, DB_TYPE === 'postgres' ? 5432 : 3306),
    username: process.env.DB_USER || (DB_TYPE === 'postgres' ? 'postgres' : 'root'),
    password: process.env.DB_PASSWORD || (DB_TYPE === 'postgres' ? 'postgres' : 'root'),
    database: process.env.DB_NAME || 'gym_routines',
    synchronize: !isProduction, // sincroniza en desarrollo, usa migrations en producción
    logging: false,
    entities: [routine_model_1.Routine, exercise_model_1.Exercise, routineExercise_model_1.RoutineExercise],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=data_source.js.map