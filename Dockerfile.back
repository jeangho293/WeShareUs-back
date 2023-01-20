FROM node:16-alpine

WORKDIR /WeShareUs-back

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]