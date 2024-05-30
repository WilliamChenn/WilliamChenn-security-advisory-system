FROM node:18-alpine

WORKDIR /front-end/

COPY public/ /front-end/public
COPY src/ /front-end/src
COPY package.json /front-end/

RUN npm install
CMD ["npm", "start"]
