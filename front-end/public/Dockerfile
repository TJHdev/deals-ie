FROM node:10.4.0 AS build-stage
WORKDIR /usr/src/front-end
COPY ./ ./
RUN npm install
RUN npm run build:prod

FROM nginx:1.15.8

COPY --from=build-stage ./public /usr/share/nginx/html

CMD [nginx-debug, "-g", "daemon off;"]