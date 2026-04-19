# Notes Service

Fastify + TypeScript сервіс для нотаток з PostgreSQL.

## Конфігурація БД

Встановити змінні середовища (в `/etc/mywebapp/config.env` або локально в `etc/mywebapp/config.env`):

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_db
DB_USER=postgres
DB_PASSWORD=postgres
```

## Запуск

1. Встановити залежності:
   ```bash
   npm install
   ```

2. Запустити міграції БД:
   ```bash
   npm run migrate
   ```

3. Запустити локально:
   ```bash
   npm run dev
   ```

4. Або зібрати та запустити:
   ```bash
   npm run build
   npm start
   ```

## Міграції

Міграції знаходяться в папці `migrations/` як TypeScript файли. Система відслідковує їх у таблиці `schema_migrations`.

### Запуск міграцій:
```bash
npm run migrate
```

### Створення нової міграції:
```bash
npm run create-migration <name>
```

Приклад:
```bash
npm run create-migration add_updated_at_column
```

Це створить файл `migrations/002_add_updated_at_column.ts` з шаблоном:
```typescript
export const migration: Migration = {
  name: '002_add_updated_at_column.ts',
  
  async up(query) {
    // Implement migration up
  },
  
  async down(query) {
    // Implement migration down (rollback)
  },
};
```

## Архітектура

- `src/server.ts` — входна точка серверу
- `src/config.ts` — конфігурація (DB, APP)
- `src/health/` — модуль health check
- `src/notest/` — модуль нотаток (DAL, service, router, validation)
- `src/render.ts` — модуль рендеру HTML / JSON
- `src/types.ts` — спільні типи
- `scripts/migrate.ts` — скрипт для запуску міграцій
- `scripts/create-migration.ts` — скрипт для створення нової міграції
- `migrations/` — TypeScript файли міграцій з up/down функціями

