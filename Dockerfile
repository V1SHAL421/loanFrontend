#  Stage 1: Compile and Build Angular Codebase
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all the dependencies
RUN npm install

# The step above was carried out before copying the rest of the
# source code in order to leverage Docker caching mechanism
# efficiently through not reinstalling dependencies unless they have changed

# Copy all files from project dir into /app dir of container
COPY . .

# Generate the build of the application
RUN npm run build

#  Stage 2: Serve app with nginx server

FROM nginx:latest

# Copy build output to replace default nginx contents
COPY --from=build app/dist/loan-app-frontend /usr/share/nginx/html

EXPOSE 80

# Run NGINX in the foreground to keep the container running.
CMD ["nginx", "-g", "daemon off;"]
