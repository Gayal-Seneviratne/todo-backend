FROM node:18-alpine3.19
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4001
CMD ["node", "dist/server.js"]
