FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
# install netcat for health/wait script
RUN apk add --no-cache netcat-openbsd

COPY . .

# make sure the wait script is executable
RUN chmod +x ./scripts/wait-for-postgres.sh || true

RUN npm run build

EXPOSE 4002
# wait for postgres (service name 'postgres' as in docker-compose) then start app
CMD ["sh", "-c", "./scripts/wait-for-postgres.sh postgres 5432 && node dist/index.js"]
