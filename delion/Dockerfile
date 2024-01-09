FROM node:16.16-alpine AS build
ARG CONFIGURATION=local
RUN apk add --no-cache bash python3 py3-pip make g++

WORKDIR /app
COPY package*.json ./
COPY patches ./patches
RUN npm ci --no-audit --progress=false
COPY . .
RUN if [ $CONFIGURATION != "local" ]; then cp /app/environments/".env.$CONFIGURATION" /app/.env; fi
RUN npm run build

FROM node:16.16-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "start"]
