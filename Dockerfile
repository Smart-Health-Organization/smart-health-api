FROM node:12-alpine

WORKDIR /home/api 

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install bcrypt

COPY . .

CMD npm run start:dev