FROM node:22-alpine

WORKDIR /supermarket/order-processing-service

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4003:4003

CMD ["node", "dist/app.js"]