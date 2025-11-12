// src/domain/entities/Exercise.entity.ts
export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public muscle_group?: string | null,
    public description?: string | null,
    public equipment?: string | null,
    public caloriesBurnedAvg?: number | null
  ) {}
}
