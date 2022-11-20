# Adapted from https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies only when needed
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies using yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejsgroup
RUN adduser --system --uid 1001 nextjsuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=bloguser:bloggroup /app/.next/standalone ./
COPY --from=builder --chown=bloguser:bloggroup /app/.next/static ./.next/static

USER nextjsuser

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]