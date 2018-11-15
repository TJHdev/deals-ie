FROM node:10.4.0

WORKDIR /usr/src/front-end

COPY ./ ./

# RUN npm cache clean
# RUN npm rebuild node-sass
RUN npm install
# RUN rm -r /usr/src/front-end/node_modules/node-sass/vendor/win32-x64-64
# RUN mkdir -p /usr/src/front-end/node_modules/node-sass/vendor/linux-x64-64
# RUN curl -L https://github.com/sass/node-sass/releases/download/v4.10.0/linux-x64-64_binding.node -o /usr/src/front-end/node_modules/node-sass/vendor/linux-x64-64/binding.node
# RUN npm rebuild node-sass --force

CMD ["/bin/bash"]

# https://stackoverflow.com/questions/41942769/issue-to-node-sass-and-docker
# https://github.com/sass/node-sass/issues/2177