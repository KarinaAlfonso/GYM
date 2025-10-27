// src/domain/dto/Exercise.dto.ts
export interface CreateExerciseDTO {
  name: string;
  muscle_group: string;
  description?: string;
}

export interface UpdateExerciseDTO {
  name?: string;
  muscle_group?: string;
  description?: string;
}
