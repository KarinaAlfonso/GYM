// src/domain/dto/Routine.dto.ts
export interface CreateRoutineDTO {
  userId: number;
  name: string;
  durationWeeks: number;
  type: 'fuerza' | 'cardio' | 'mixto';
  exercises?: CreateRoutineExerciseDTO[];
}

export interface UpdateRoutineDTO {
  name?: string;
  durationWeeks?: number;
  type?: 'fuerza' | 'cardio' | 'mixto';
  exercises?: UpdateRoutineExerciseDTO[];
}

export interface CreateRoutineExerciseDTO {
  exerciseId: number;
  sets: number;
  reps: number;
  weight?: number | null;
  orderInRoutine?: number | null;
}

export interface UpdateRoutineExerciseDTO {
  id?: number;
  exerciseId?: number;
  sets?: number;
  reps?: number;
  weight?: number | null;
  orderInRoutine?: number | null;
}
