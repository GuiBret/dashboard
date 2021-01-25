FROM node:15.6.0-alpine3.10 AS compile-image


WORKDIR /opt/ng

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . ./

RUN node_modules/.bin/ng build --prod --baseHref=/dashboard/ --deployUrl=/dashboard/

FROM nginx:latest

COPY --from=compile-image /opt/ng/dist/dashboard /usr/share/nginx/html/dashboard

COPY .htaccess /usr/share/nginx/html/dashboard
