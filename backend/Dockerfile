FROM node:10

ADD . /app

RUN cd /app; \
  yarn

RUN cd /app; \
  yarn run db-uninstall

# RUN cd /app; \
#   yarn run db-install

EXPOSE 4000
VOLUME /app

CMD ["node", "/app/bin/www"]