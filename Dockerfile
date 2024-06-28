FROM node:18

ENV PORT 3000

#create app directory
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
