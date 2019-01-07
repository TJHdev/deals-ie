FROM node:10.4.0 AS build-stage
WORKDIR /usr/src/front-end
COPY ./ ./
RUN npm install
RUN npm run build:prod

FROM nginx:1.15.8-alpine
COPY --from=build-stage /usr/src/front-end/public/ /usr/share/nginx/html

# COPY --from=build-stage /usr/src/front-end/public/nginx.conf /etc/nginx/conf.d/default.conf

# RUN apt update
# RUN apt install -y nginx-plus-module-perl
# RUN apt-get install nginx-plus-module-perl

# CMD ["nginx -g 'daemon off;'"]  