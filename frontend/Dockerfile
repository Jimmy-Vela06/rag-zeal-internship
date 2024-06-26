# Use an official Node.js runtime as the base image
FROM node:alpine3.20 AS build

# Set the working directory in the container
WORKDIR /zeal

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Install the project dependencies
RUN npm install

# Copy the entire Angular project to the working directory
COPY . .

# Build the Angular application
# RUN ng build --prod
# RUN npm run build

# Use an official Nginx runtime as the base image for serving the Angular app
# FROM nginx:stable-perl

# Copy the built Angular files to the Nginx default directory
# COPY --from=build /app/dist/zeal /usr/share/nginx/html

# Expose the port on which Nginx serves the Angular app (default is 80)
EXPOSE 4200

# CMD [ "ng", "serve" ]
# Serve the Angular application using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]
