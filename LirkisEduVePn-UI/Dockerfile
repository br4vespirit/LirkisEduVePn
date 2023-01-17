FROM node as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/lirkis-edu-ve-pn-ui /usr/share/nginx/html

EXPOSE 80
