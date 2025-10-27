import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
//import { User } from '../../..'; // si necesitas referencia a User service solo por id
import { RoutineExercise } from './routineExercise.model';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number; // FK lógico, integridad referencial gestionada por API de usuario

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'int' })
  durationWeeks!: number;

  @Column({ type: 'enum', enum: ['fuerza','cardio','mixto'] })
  type!: string;

  @OneToMany(() => RoutineExercise, re => re.routine, { cascade: true })
  exercises!: RoutineExercise[];

  @CreateDateColumn()
  createdAt!: Date;
}
