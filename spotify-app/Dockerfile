FROM node as build

COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "build"]

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build ./build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]