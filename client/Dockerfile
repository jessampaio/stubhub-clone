FROM node:16.20-alpine3.17


WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000


RUN addgroup app && adduser -S -G app app
RUN mkdir node_modules/.cache
RUN chown app:app node_modules/.cache
RUN chown app:app vite.config.ts

USER app
CMD ["npm", "run", "dev"]