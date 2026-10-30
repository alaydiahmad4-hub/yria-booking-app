# ==========================================================
# Seyran Syria (سيران سوريا) - Multi-Stage Production Dockerfile
# ==========================================================

# Stage 1: Build the React + TypeScript frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
RUN npm ci

# Copy full source and compile production bundle
COPY . .
RUN npm run build

# Stage 2: Production Runtime with Node.js & SQLite
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5001

# Install python and build tools needed by native dependencies (better-sqlite3)
RUN apk add --no-cache python3 py3-pip make g++

# Copy package manifests and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server code and database files
COPY server/ ./server/
# Copy compiled frontend dist from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Create persistent storage volume mount point
VOLUME ["/app/server"]

EXPOSE 5001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/health || exit 1

CMD ["node", "server/server.js"]
