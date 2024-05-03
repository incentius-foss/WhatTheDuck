# Use Node.js Alpine image as base
FROM node:alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

RUN npm install -g @quasar/cli

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 8080 to the outside world
EXPOSE 9000

# Default command to start Quasar development server
CMD ["quasar", "dev"]
