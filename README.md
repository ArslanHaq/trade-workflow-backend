# Trade Workflow Backend

A NestJS API for configurable, multi-stage case workflows. You define workflow templates (stages and the allowed transitions between them), the forms and documents each stage needs, and the approval chain. Cases then move through those workflows.

## Features

- **Workflow templates** with stages and allowed transitions
- **Product templates**
- **Form schemas** for the data each stage collects
- **Document types and rules** for required documents
- **Approval chains** for sign-off steps
- **Cases** that move through a workflow
- **Users and roles**
- **Audit log** records
- **Auth:** every route requires an `x-api-key` header unless it is marked public. Register and login return a JWT.
- **Swagger UI** at `/api/docs`

Each module has CRUD endpoints, a controller, a service and unit tests.

## Tech stack

NestJS 11 · TypeScript · Prisma 7 · PostgreSQL · JWT · Swagger · Jest

## Getting started

Requires Node.js and a PostgreSQL database.

```bash
npm install
# create a .env file (see below)
npx prisma migrate dev --name init   # create the database tables
npx prisma generate
npm run start:dev
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port to listen on (default `3000`) |
| `X_API_KEY` | Value clients must send in the `x-api-key` header |
| `JWT_SECRET` | Secret for signing tokens |
| `JWT_EXPIRES_IN` | Token lifetime, for example `1d` |
| `NODE_ENV` | `development` or `production` |

## Data model

`User`, `Role`, `ProductTemplate`, `WorkflowTemplate`, `WorkflowStage`, `WorkflowTransition`, `FormSchema`, `DocumentType`, `DocumentRule`, `ApprovalChain`, `Case`, `AuditLog`. See [`prisma/schema.prisma`](prisma/schema.prisma).

## Scripts

| Command | What it does |
|---|---|
| `npm run start:dev` | Start in watch mode |
| `npm run build` / `npm run start:prod` | Build and run the compiled app |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  modules/<feature>/
    controller/        Routes and Swagger docs (with .spec.ts)
    service/           Business logic (with .spec.ts)
    <feature>.module.ts
  common/prisma/       Shared CRUD service
  prisma/              Prisma client service
prisma/schema.prisma   Database schema
```
