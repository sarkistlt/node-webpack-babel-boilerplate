FROM node:8.11.2-alpine

RUN apk add -U --no-cache yarn git libc6-compat curl && \
    yarn global add pm2@2.10.4

COPY / /app

WORKDIR /app

RUN yarn install && \
    yarn run build

EXPOSE 80

CMD ["pm2-runtime", "start", "process.json"]
