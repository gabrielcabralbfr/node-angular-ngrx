FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i
RUN npm i -g @adonisjs/cli
RUN adonis migration:run
RUN node --harmony_proxies ace migration:run --force

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "start" ]
