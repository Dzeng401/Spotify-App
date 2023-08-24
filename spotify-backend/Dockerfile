FROM node

WORKDIR /backend

COPY ./package*.json ./
RUN npm install

COPY ./ /backend

EXPOSE 8080

CMD ["npm", "run", "dev"]