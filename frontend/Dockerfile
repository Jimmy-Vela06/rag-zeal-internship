# Stage 1: Build the Angular app
FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the Angular app using nginx
FROM nginx:stable

# Copy nginx configuration
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app
COPY --from=build /app/dist/intern-project/browser /usr/share/nginx/html

# Expose port 80 for HTTP traffic (for documentation purposes)
# EXPOSE 80

# CMD to start nginx and keep it running
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

