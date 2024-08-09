# Stage 1: Build the React app
FROM node:lts-alpine as build

LABEL AUTHOR="de-marauder"
LABEL maintainer="de-marauder"

# Set the working directory in the container
WORKDIR /app

# ENV REACT_APP_URL='http://192.168.0.123:5001/api'

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./
# Install the dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .
RUN echo 'REACT_APP_BASE_URL=http://192.168.0.123:5001/api/' > .env

# Build the React app
RUN yarn build

# Stage 2: Host the built app in an Alpine image
FROM nginx:1.21-alpine

# Copy the built app to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for incoming traffic
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]