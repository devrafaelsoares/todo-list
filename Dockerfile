FROM node:20.11.0-alpine

WORKDIR /app/todo-list-app

COPY package*.json .

RUN npm i

COPY . .

ENTRYPOINT [ "npm", "run", "dev" ]