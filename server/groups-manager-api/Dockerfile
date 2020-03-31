FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i
RUN npm i -g @adonisjs/cli
RUN npm i -g @adonisjs/ace
COPY . .
COPY init.sql /docker-entrypoint-initdb.d/

RUN node --harmony ace migration:run


EXPOSE 3333

CMD [ "npm", "run", "start" ]
