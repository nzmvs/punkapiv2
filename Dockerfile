FROM node:17-alpine3.14

COPY . .

RUN npm ci

ENTRYPOINT node index.js
