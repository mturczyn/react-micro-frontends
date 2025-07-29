# 1. For build React app
FROM node:22-alpine AS development

WORKDIR /app

# COPY .nginx/nginx.conf /app/.nginx/nginx.conf
COPY package.json /app/package.json

RUN npm install

COPY . /app

ENV CI=false

RUN npm run build

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=development /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage to nginx
COPY --from=development /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
