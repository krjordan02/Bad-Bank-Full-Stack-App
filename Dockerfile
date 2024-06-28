FROM node:18

ENV PORT 3000

#create app directory
WORKDIR /app

COPY package*.json /app
COPY . /app

RUN npm i express
RUN npm i cors
RUN npm i firebase
RUN npm i firebase-admin
RUN npm i mongo
RUN npm i mongodb
