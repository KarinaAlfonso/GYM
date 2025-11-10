import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoutineExercise } from './routineExercise.model';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn({ name: 'exercise_id' })
  id!: number;

  @Column({ name: 'exercise_name', type: 'varchar', length: 100 })
  name!: string;
  @Column({ name: 'muscle_group', type: 'varchar', length: 50, nullable: true })
  muscle_group!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'equipment', type: 'varchar', length: 50, nullable: true })
  equipment!: string | null;

  @Column({ name: 'calories_burned_avg', type: 'decimal', precision: 6, scale: 2, nullable: true })
  calories_burned_avg!: number | null;

  @OneToMany(() => RoutineExercise, re => re.exercise)
  routineConnections!: RoutineExercise[];
}
