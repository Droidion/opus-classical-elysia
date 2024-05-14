# Opus Classical

Curated catalogue for streaming classical music.

Bun, Elysia, DrizzleORM, Turso, Tailwind, Vite.

[![test-and-lint](https://github.com/Droidion/opus-classical-elysia/actions/workflows/test.yml/badge.svg)](https://github.com/Droidion/opus-classical-elysia/actions/workflows/test.yml)

## Run locally

- Have Bun installed.
- Have Turso DB available in the cloud.
- Create `.env` file with environment variables:
  - `IMAGES_URL`
  - `POSTGRES_CONNECTION_STRING`
- Install packages `$ bun i`.
- Run statis assets build in dev mode `$ bun run ui:dev`.
- Run in parallel server in dev mode `$ bun run dev`.
- Open http://localhost:3000
