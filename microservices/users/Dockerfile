FROM node:22-alpine

WORKDIR /supermarket/users-service

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4002:4002

CMD ["node", "dist/app.js"]