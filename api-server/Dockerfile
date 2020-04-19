FROM node:alpine

WORKDIR /opt/formol


COPY --chown=root:root docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN adduser -D formol
RUN apk add python make g++
# RUN chmod 775 /docker-entrypoint.sh
# USER formol
RUN npm install && npm install -g sequelize-cli nodemon

EXPOSE 3001

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]

COPY . /opt/formol
