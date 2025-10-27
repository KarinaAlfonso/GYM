import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoutineExercise } from './routineExercise.model';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 50 })
  muscle_group!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => RoutineExercise, re => re.exercise)
  routineConnections!: RoutineExercise[];
}
