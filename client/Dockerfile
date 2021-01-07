FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .

ENV NODE_ENV production

RUN npm run build

CMD ["npm", "run", "start"]