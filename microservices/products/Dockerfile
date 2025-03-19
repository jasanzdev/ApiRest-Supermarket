FROM node:22-alpine

WORKDIR /supermarket/products-service

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4001:4001

CMD ["node", "dist/index.js"]