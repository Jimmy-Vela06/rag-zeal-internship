# Stage 1: Build the Angular app
FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the Angular app using nginx
FROM nginx:stable
COPY ./default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/intern-project/browser /usr/share/nginx/html

EXPOSE $PORT

# CMD to start nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]

