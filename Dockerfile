FROM oven/bun:latest as base

WORKDIR /app

# Separate stage for installing dependencies
FROM base AS dependencies
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Build stage for development dependencies
FROM dependencies AS development
COPY --from=dependencies /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=development

# Prerelease stage for building the UI
FROM development AS prerelease
ENV NODE_ENV=production
ARG PUBLIC_API_URL
RUN bun run ui:build

# Final release stage
FROM base AS release
COPY --from=dependencies /temp/prod/node_modules node_modules
COPY --from=prerelease /app .

USER bun
ENV NODE_ENV production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD bun run start
