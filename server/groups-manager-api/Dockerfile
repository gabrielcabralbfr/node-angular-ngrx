FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i
RUN npm i -g @adonisjs/cli
COPY . .
EXPOSE 3333

CMD [ "npm", "run", "start" ]
