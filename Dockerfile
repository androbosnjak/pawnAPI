FROM node:18-alpine3.14

WORKDIR '/api'

COPY package.json .
RUN yarn
COPY . .

RUN npx pm2 install typescript

CMD [ "yarn", "start" ]

