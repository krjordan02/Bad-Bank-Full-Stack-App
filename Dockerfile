FROM node:18

ENV PORT 3000

#create app directory
WORKDIR /app

COPY index.js /app/index.js
COPY auth.js /app/auth.js
COPY dal.js /app/dal.js
COPY public /app/public
COPY package.json /app/package.json

EXPOSE 3000
RUN npm i express
RUN npm i cors
RUN npm i firebase
RUN npm i firebase-admin
RUN npm i mongo
RUN npm i mongodb
