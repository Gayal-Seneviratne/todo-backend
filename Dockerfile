FROM node:18-alpine3.19 AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine3.19 AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=4000

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/server.js"]
