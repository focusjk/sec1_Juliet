FROM node:10

ADD . /app

RUN cd /app; \
  yarn

EXPOSE 4000
VOLUME /app

CMD ["node", "/app/bin/www"]