FROM node:18-alpine3.14

WORKDIR '/api'

COPY package.json .
RUN yarn
COPY . .

RUN yarn build

CMD [ "yarn", "start" ]

