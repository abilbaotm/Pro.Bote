FROM node:13 as build
WORKDIR /app
COPY . .
RUN npm install
RUN node_modules/.bin/ng build --prod --base-href . --output-path www

FROM nginx:latest
COPY --from=build /app/www /usr/share/nginx/html
