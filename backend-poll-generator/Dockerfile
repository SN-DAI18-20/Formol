FROM node:alpine

WORKDIR /opt/formol

COPY . /opt/formol
COPY --chown=root:root docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN adduser -D formol
# RUN chmod 775 /docker-entrypoint.sh

# USER formol
RUN npm install && npm i -g nodemon

EXPOSE 3001

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]
