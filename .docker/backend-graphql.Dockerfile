FROM node:22.3.0-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo
COPY . .

RUN turbo prune backend-graphql --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=backend-graphql...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app/apps/backend-graphql/package.json .