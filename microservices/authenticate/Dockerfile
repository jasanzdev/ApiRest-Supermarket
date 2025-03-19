FROM node:22-alpine

WORKDIR /supermarket/authentication-service

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000:4000

CMD ["node", "dist/app.js"]