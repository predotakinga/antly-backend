FROM node:16.16.0-alpine As build

WORKDIR /usr/src/app

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

RUN npm i

COPY . .

RUN npx prisma generate 

FROM node:16.16.0-alpine As development

COPY --from=build /usr/src/app .

CMD npm run start:dev

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY prisma ./src/prisma/

RUN npm i glob rimraf

RUN npm i --only=production

COPY . .

COPY --from=build ./dist

CMD ["node", "dist/main"]