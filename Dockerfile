FROM node:gallium-alpine

ENV NODE_ENV=production

ENV PORT=3000

WORKDIR /app

COPY ["package.json", "./"]

RUN yarn

COPY . .

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "start"]