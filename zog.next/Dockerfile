# Dockerfile
#test2
##### DEPENDENCIES
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat-dev
WORKDIR /app

COPY prisma ./
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn --frozen-lockfile

##### BUILDER

FROM node:18-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN  yarn build

##### RUNNER

FROM node:18-alpine AS runner
RUN apk add --no-cache libc6-compat openssl1.1-compat-dev
RUN yarn global add prisma
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#my
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["/bin/sh", "-c", "prisma db push;node server.js"]
