FROM node:8.12.0-alpine

RUN apk add --no-cache bash

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

RUN ["chmod", "+x", "/usr/app/wait-for-it.sh"]

EXPOSE 4000