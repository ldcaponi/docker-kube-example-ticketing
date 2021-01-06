FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm run build
COPY . .

CMD ["npm", "start"]