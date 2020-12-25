FROM node:12.18.3-alpine

USER root

ENV HOME=/home/node/app

ENV NODE_CONFIG_DIR=$HOME/src/config

WORKDIR $HOME

RUN mkdir node_modules

RUN chown -R node:node $HOME

RUN apk add git
COPY .gitignore .

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD yarn start
