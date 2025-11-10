import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Routine } from './routine.model';
import { Exercise } from './exercise.model';

@Entity('routine_exercises')
export class RoutineExercise {
  @PrimaryColumn({ name: 'routine_id', type: 'int' })
  routineId!: number;

  @PrimaryColumn({ name: 'exercise_id', type: 'int' })
  exerciseId!: number;

  @ManyToOne(() => Routine, routine => routine.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routine_id' })
  routine!: Routine;

  @ManyToOne(() => Exercise, exercise => exercise.routineConnections, { eager: true })
  @JoinColumn({ name: 'exercise_id' })
  exercise!: Exercise;

  @Column({ name: 'sets', type: 'int', default: 3 })
  sets!: number;

  @Column({ name: 'reps', type: 'int', default: 10 })
  reps!: number;

  @Column({ name: 'weight', type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight!: number | null;

  @Column({ name: 'rest_time_sec', type: 'int', nullable: true })
  rest_time_sec!: number | null;

  @Column({ name: 'order_in_routine', type: 'int' })
  orderInRoutine!: number;
}
