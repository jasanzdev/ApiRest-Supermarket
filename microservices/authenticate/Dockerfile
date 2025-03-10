FROM node:22-alpine

WORKDIR /supermarket-authentication

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["node", "dist/app.js"]