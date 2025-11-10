FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL=/api/v1
ARG VITE_I18N_BASE=https://cdn.learn-language.es/i18n
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_I18N_BASE=${VITE_I18N_BASE}

RUN npx react-router build

FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 8080
CMD ["npm", "run", "start"]
