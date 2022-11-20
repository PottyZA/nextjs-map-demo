FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .

# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ENV NODE_ENV production

# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

CMD yarn start