FROM node:22-alpine

WORKDIR /gateway

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000:3000

CMD ["node", "dist/app.js"]