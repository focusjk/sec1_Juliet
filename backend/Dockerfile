FROM node:10

ADD . /app

RUN cd /app; \
  yarn
ENV TZ Asia/Bangkok
EXPOSE 4000
VOLUME /app

CMD ["node", "/app/bin/www"]