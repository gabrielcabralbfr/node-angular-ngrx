FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i -g @adonisjs/cli
RUN npm i

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "start" ]
