FROM node:20.2 as builder
WORKDIR /usr/src/app




COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:stable-alpine as prod

LABEL com.centurylinklabs.watchtower.enable="true"

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/.htaccess /usr/share/nginx/html/
COPY --from=builder /usr/src/app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]