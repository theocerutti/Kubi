FROM node:14-bullseye AS build

WORKDIR /app

RUN apt-get -y update && apt -y install python

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "build:prod"]

FROM nginx:1.21.1-alpine

COPY --from=build /app/dist/front/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
