FROM node:alpine

WORKDIR /opt/formol

COPY package.json .
COPY --chown=root:root docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN adduser -D formol
RUN apk add python make g++
RUN npm install && npm install -g sequelize-cli nodemon

COPY . .

EXPOSE 3001

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]
