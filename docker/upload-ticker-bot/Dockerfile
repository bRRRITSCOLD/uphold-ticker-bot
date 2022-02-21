FROM node:17-alpine3.14

WORKDIR /home/app

COPY package.json /home/app

RUN npm install

COPY . /home/app

CMD npm start