FROM node:18-alpine3.14

WORKDIR '/api'

COPY package.json .
RUN yarn
COPY . .

CMD [ "yarn", "start" ]

