FROM node:20

WORKDIR /app

COPY package.json package-lock.json tsconfig.json .

RUN npm install

COPY . .


CMD ["npm", "run", "dev"]