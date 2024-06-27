FROM node:18

ENV PORT 3000

#create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#install dependencies
COPY package*.json /usr/src/app
RUN npm install

COPY . /usr/src/app

CMD "node" "index.js"

EXPOSE 3000