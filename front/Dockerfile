FROM node:14-bullseye

WORKDIR /app

RUN apt-get -y update && apt -y install python

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build:prod"]
