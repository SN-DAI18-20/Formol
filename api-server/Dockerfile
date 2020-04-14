FROM node:alpine

WORKDIR /opt/formol

COPY . /opt/formol
COPY --chown=root:root docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN adduser -D formol
RUN apk add python make g++
# RUN chmod 775 /docker-entrypoint.sh
# USER formol
RUN npm install

EXPOSE 3001

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]
