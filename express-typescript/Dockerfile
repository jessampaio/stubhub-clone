FROM node:16.20-alpine3.17


WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3001

RUN addgroup app && adduser -S -G app app
RUN mkdir node_modules/.cache
RUN chown app:app node_modules/.cache

USER app
CMD ["npm", "start"]

