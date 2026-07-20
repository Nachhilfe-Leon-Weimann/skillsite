# syntax=docker/dockerfile:1.7
# Multi-stage build for one Next.js app from the pnpm/turbo monorepo
# (standalone output). Select the app via: --build-arg APP=marketing|portal
# The runtime image ships only the standalone server plus static assets and
# runs as a non-root user.
ARG APP=marketing

FROM node:26-bookworm-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    NEXT_TELEMETRY_DISABLED=1
RUN npm install -g corepack && corepack enable
WORKDIR /app

# --- Install dependencies (layer cached on lockfile + workspace manifests) ---
FROM base AS deps
ARG APP
# pnpm-workspace.yaml carries the allowBuilds entries (e.g. sharp) and .npmrc
# the hoist patterns, so both must be present for install to behave the same
# as locally.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/${APP}/package.json ./apps/${APP}/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- Build the selected app ---
FROM base AS build
ARG APP
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/${APP}/node_modules ./apps/${APP}/node_modules
COPY . .
RUN pnpm --filter "./apps/${APP}" build

# --- Runtime image ---
FROM node:26-bookworm-slim AS runner
ARG APP
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP=${APP}
WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone output mirrors the repo layout (tracing root = repo root), so the
# server entry lives at apps/${APP}/server.js inside the bundle.
COPY --from=build --chown=nextjs:nodejs /app/apps/${APP}/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/${APP}/public ./apps/${APP}/public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Shell form is needed to expand ${APP}; exec hands PID over to node so
# signals keep working (compose additionally runs with init: true).
CMD ["sh", "-c", "exec node apps/${APP}/server.js"]
