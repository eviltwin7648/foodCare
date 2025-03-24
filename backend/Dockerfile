FROM node:20

WORKDIR /app

COPY package.json package-lock.json tsconfig.json .

RUN npm install

COPY . .

RUN npx prisma generate && npx prisma db:seed

CMD ["npm", "run", "start"]
