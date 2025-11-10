-- init_postgres.sql
-- Script para inicializar la base de datos PostgreSQL para routine_service

-- Crear esquema básico, tablas y constraints compatibles con el modelo relacional

CREATE TABLE IF NOT EXISTS exercises (
  exercise_id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(100) NOT NULL,
  muscle_group VARCHAR(50),
  equipment VARCHAR(50),
  description TEXT,
  calories_burned_avg NUMERIC(6,2)
);

CREATE TABLE IF NOT EXISTS routines (
  routine_id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  trainer_id INT,
  routine_name VARCHAR(100) NOT NULL,
  goal VARCHAR(100),
  difficulty VARCHAR(20) NOT NULL,
  duration_weeks INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS routine_exercises (
  routine_id INT NOT NULL,
  exercise_id INT NOT NULL,
  sets INT NOT NULL CHECK (sets > 0),
  reps INT NOT NULL CHECK (reps > 0),
  weight NUMERIC(5,2),
  rest_time_sec INT,
  order_in_routine INT NOT NULL,
  PRIMARY KEY (routine_id, exercise_id),
  CONSTRAINT fk_rx_routine FOREIGN KEY (routine_id) REFERENCES routines(routine_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rx_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Opcional: insertar datos de ejemplo
INSERT INTO exercises (exercise_name, muscle_group, equipment, description, calories_burned_avg)
VALUES
  ('Sentadilla', 'Piernas', 'Barra', 'Sentadillas con barra', 50.00),
  ('Press de banca', 'Pecho', 'Barra', 'Press de banca plano', 40.00)
ON CONFLICT DO NOTHING;

-- Nota: difficulty y status son VARCHAR aquí; la validación de valores se puede hacer desde la app o creando ENUMs.
