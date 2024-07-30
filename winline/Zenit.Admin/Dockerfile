FROM node:14 as build
WORKDIR /app
ARG REACT_APP_API
ARG REACT_APP_URL_IMAGE
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API=$REACT_APP_API
ENV REACT_APP_URL_IMAGE=$REACT_APP_URL_IMAGE
COPY package.json ./
COPY yarn.lock ./
RUN yarn install 
COPY . ./
RUN env && yarn run build



# production environment
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/version.txt /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]