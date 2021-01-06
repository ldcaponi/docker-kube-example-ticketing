FROM node:alpine

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
RUN npm install --no-optional
COPY . .
RUN npm run build

CMD ["npm", "start"]