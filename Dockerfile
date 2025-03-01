# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies efficiently
COPY package*.json package-lock.json ./
RUN npm ci --only=production

# Copy the application source code
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]