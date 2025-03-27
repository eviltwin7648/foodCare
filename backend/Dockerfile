FROM node:20

WORKDIR /app

COPY package.json package-lock.json tsconfig.json .

RUN npm install

RUN npm run build

COPY . .

RUN npx prisma generate 

CMD ["npm", "run", "start"]
