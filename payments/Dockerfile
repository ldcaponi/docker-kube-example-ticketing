FROM node:alpine

ENV CI=true

WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod
COPY . .

ENV NODE_ENV production
RUN npm run build


CMD ["npm", "start"]