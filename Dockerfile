FROM node:alpine
WORKDIR /usr/src/app

COPY package.* .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev:app"]
