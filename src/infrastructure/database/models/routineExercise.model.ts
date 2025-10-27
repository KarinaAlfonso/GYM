import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Routine } from './routine.model';
import { Exercise } from './exercise.model';

@Entity('routine_exercises')
export class RoutineExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Routine, routine => routine.exercises, { onDelete: 'CASCADE' })
  routine!: Routine;

  @ManyToOne(() => Exercise, exercise => exercise.routineConnections, { eager: true })
  exercise!: Exercise;

  @Column({ type: 'int', default: 3 })
  sets!: number;

  @Column({ type: 'int', default: 10 })
  reps!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight!: number | null;

  @Column({ type: 'int', nullable: true })
  orderInRoutine!: number | null;
}
