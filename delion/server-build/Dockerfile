FROM node:19.8-alpine AS build
ARG CONFIGURATION=local
RUN apk add --no-cache bash python3 py3-pip make g++

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --progress=false
COPY . .
RUN cp /app/environments/.env.production /app/.env
RUN npm run build

FROM node:19.8-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "start"]
