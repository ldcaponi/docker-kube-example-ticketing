FROM node:alpine

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
RUN npm install --no-optional
COPY . .
RUN npm run build

CMD ["npm", "start"]