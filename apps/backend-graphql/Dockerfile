ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable
RUN corepack prepare pnpm@9.5.0 --activate
RUN npm install turbo@latest --global

FROM base AS builder
WORKDIR /app

COPY . .
RUN turbo prune backend-graphql --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install

COPY --from=builder /app/out/full/ .
# RUN pnpm --filter=backend-graphql run postinstall
RUN turbo build --filter=backend-graphql^...

RUN pnpm prune --prod --no-optional
RUN rm -rf /app/backend-graphql/src

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer --chown=nodejs:nodejs /app/ .

WORKDIR /app/apps/ßbackend-graphql

EXPOSE 3100

CMD ["pnpm", "run", "dev"]
