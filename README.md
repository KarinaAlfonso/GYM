# Routine Service (GYM)

Microservicio `routine-service` para gestionar rutinas y ejercicios. Está escrito en TypeScript usando Express y TypeORM y persiste en PostgreSQL. El proyecto incluye configuración para ejecutarse localmente (npm) y con Docker / docker-compose.

## Contenido
- `src/` - código fuente (domain, application, infrastructure)
- `init-scripts/init_postgres.sql` - script de inicialización de la base de datos (tablas y datos seed)
- `Dockerfile` - imagen del servicio
- `docker-compose.yml` - orquesta Postgres + routine-service
- `scripts/wait-for-postgres.sh` - helper para esperar a que Postgres esté listo dentro del contenedor

## Requisitos
- Node 18+ (para desarrollo local)
- Docker + Docker Compose (para ejecutar el stack en contenedores)
- PostgreSQL (si ejecutas la DB fuera de Docker)

## Variables de entorno
El servicio utiliza las siguientes variables (puedes exportarlas o pasarlas vía `docker-compose`):

- `DB_TYPE` (postgres)
- `DB_HOST` (host de la base de datos, p.ej. `localhost` o `postgres` en compose)
- `DB_PORT` (5432)
- `DB_USER` (usuario DB)
- `DB_PASSWORD` (contraseña DB)
- `DB_NAME` (nombre de la base de datos, p.ej. `gym_routines`)
- `PORT` (puerto HTTP del servicio, por defecto 4002)
- `NODE_ENV` (`development` | `production`)

En `docker-compose.yml` ya hay valores de ejemplo. Para entornos más seguros añade un `env_file` y no pongas credenciales en el repo.

## Ejecutar en local (desarrollo)
1. Instala dependencias:

```powershell
npm ci
```

2. Ejecuta en modo desarrollo (hot-reload):

```powershell
npm run dev
```

3. Compilar y ejecutar la versión de producción localmente:

```powershell
npm run build
npm start
```

> Nota: la configuración de TypeORM usa `synchronize` en desarrollo; para producción es recomendable usar migraciones.

## Ejecutar con Docker (recomendado para pruebas locales)
El repositorio ya incluye `Dockerfile` y `docker-compose.yml` que levantan Postgres y el servicio.

1. Levantar el stack (reconstruye la imagen si hay cambios):

```powershell
docker-compose -f .\docker-compose.yml up --build -d
```

2. Ver contenedores y su estado:

```powershell
docker ps -a
```

3. Ver logs del servicio:

```powershell
docker-compose -f .\docker-compose.yml logs -f routine-service
docker-compose -f .\docker-compose.yml logs -f postgres
```

4. Limpiar (parar y borrar volúmenes):

```powershell
docker-compose -f .\docker-compose.yml down -v
```

### Detalles importantes del compose
- El contenedor de Postgres ejecuta `init-scripts/init_postgres.sql` la primera vez para crear tablas y datos seed.
- El `Dockerfile` incluye un script `scripts/wait-for-postgres.sh` y usa `netcat` en la imagen para esperar a que Postgres acepte conexiones antes de iniciar la app.

## API - Endpoints principales
Base URL (local / Docker): `http://localhost:4002`

1. Health
- GET /health
- Respuesta: `{ status: 'ok', service: 'routine-service', timestamp: '...' }`

2. Exercises
- GET /api/exercises - lista ejercicios
- GET /api/exercises/:id - obtener ejercicio
- POST /api/exercises - crear ejercicio

Ejemplo POST /api/exercises (body JSON):

```json
{
  "name": "Sentadilla",
  "muscle_group": "Piernas",
  "description": "Sentadilla trasera con barra",
  "equipment": "Barra",
  "caloriesBurnedAvg": 50.0
}
```

3. Routines
- GET /api/routines - listar rutinas
- GET /api/routines/:id - obtener rutina por id (incluye ejercicios anidados)
- GET /api/routines/user/:userId - rutinas por usuario
- POST /api/routines - crear rutina (crea fila en `routines` y filas en `routine_exercises`)

Ejemplo POST /api/routines (body JSON)

```json
{
  "clientId": 1,
  "trainerId": 2,
  "routineName": "Fuerza pierna 6 semanas",
  "goal": "Hipertrofia",
  "difficulty": "medio",
  "durationWeeks": 6,
  "status": "active",
  "exercises": [
    { "exerciseId": 1, "sets": 4, "reps": 6, "weight": 80.0, "restTimeSec": 120, "orderInRoutine": 1 }
  ]
}
```

Respuesta esperada: 201 con la rutina creada y los ejercicios anidados (ids y timestamps).

> Nota: el servicio acepta `clientId` o `userId` en la petición y normaliza internamente al campo que usa el modelo (`userId` → `client_id` en la DB).

## Probar con Postman
- Crea un Environment con `base_url = http://localhost:4002` y usa las rutas anteriores.
- Puedes importar la colección JSON que incluya health, exercises (GET/POST) y routines (GET/POST) si la añades al repo.

## Inspeccionar la base de datos (psql)
Abrir psql dentro del contenedor Postgres:

```powershell
docker-compose -f .\docker-compose.yml exec postgres psql -U postgres -d gym_routines
# luego en psql:
\dt
SELECT * FROM exercises LIMIT 10;
SELECT * FROM routines LIMIT 10;
SELECT * FROM routine_exercises LIMIT 10;
\q
```

## Migraciones
- Actualmente el proyecto usa `synchronize` en desarrollo y el script `init_postgres.sql` para inicializar la BD en Docker.
- Recomendado: agregar migraciones TypeORM para control versionado de esquema antes de producción.

## Debugging / Troubleshooting
- Si la app falla con `ECONNREFUSED` al arrancar: revisa que Postgres esté `healthy` y que el servicio tenga `wait-for-postgres` activo (ya incluido en el Dockerfile).
- Para ver errores: `docker-compose logs -f routine-service`.
- Si recibes 400 en `POST /api/routines` revisa que envíes `clientId` o `userId` y que `exercises` contenga `exerciseId` válidos.

## Tests
- Hay una carpeta `tests/` con tests de ejemplo. Si quieres, puedo añadir configuración de Jest y scripts `npm test`.

## Próximos pasos recomendados
- Añadir migraciones y un job one-shot para ejecutarlas en despliegues.
- Añadir validaciones (Joi/Zod) y middleware de autenticación.
- Añadir swagger abierto en `/docs` y una colección Postman en `postman/`.

Si quieres, genero una colección Postman en el repo y agrego un script `npm test` con Jest y un test de creación de rutina. ¿Cuál prefieres que haga ahora?
# GYM