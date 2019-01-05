# FROM nginx:alpine

# COPY ./ /usr/share/nginx/html

FROM node:10.4.0 AS build-stage
WORKDIR /usr/src/front-end
COPY ./ ./
RUN npm install
RUN npm run build:prod

FROM nginx:1.15.8

# COPY --from=build-stage ./usr/src/front-end/public/ /var/www
COPY --from=build-stage ./public /usr/share/nginx/html
COPY --from=build-stage ./public/nginx.conf /etc/nginx/conf.d/default.conf

# COPY ./build/ /var/www
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx -g 'daemon off;'"]  