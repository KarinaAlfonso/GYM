import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
//import { User } from '../../..'; // si necesitas referencia a User service solo por id
import { RoutineExercise } from './routineExercise.model';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn({ name: 'routine_id' })
  id!: number;

  @Column({ name: 'client_id', type: 'int' })
  userId!: number; // maps to client_id in DB

  @Column({ name: 'trainer_id', type: 'int', nullable: true })
  trainerId!: number | null;

  @Column({ name: 'routine_name', length: 100 })
  name!: string;

  @Column({ name: 'duration_weeks', type: 'int' })
  durationWeeks!: number;

  @Column({ name: 'difficulty', length: 20 })
  type!: string;

  @Column({ name: 'goal', type: 'varchar', length: 100, nullable: true })
  goal!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 20, nullable: true })
  status!: string | null;
  @OneToMany(() => RoutineExercise, re => re.routine, { cascade: true })
  exercises!: RoutineExercise[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
