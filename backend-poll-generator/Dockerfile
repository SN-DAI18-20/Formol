FROM node:alpine

WORKDIR /opt/formol

COPY package.json .
COPY --chown=root:root docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN adduser -D formol
# RUN chmod 775 /docker-entrypoint.sh

# USER formol
RUN npm install && npm i -g nodemon

COPY . .

EXPOSE 3001

ENTRYPOINT [ "sh", "/docker-entrypoint.sh" ]
