import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Routine } from './models/routine.model';
import { Exercise } from './models/exercise.model';
import { RoutineExercise } from './models/routineExercise.model';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'gym_routines',
  synchronize: false, // usar migrations en producción (true solo en dev inicial)
  logging: false,
  entities: [Routine, Exercise, RoutineExercise],
  migrations: ['dist/migrations/*.js'],
});
