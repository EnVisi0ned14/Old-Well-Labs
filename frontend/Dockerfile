# Use a specific version of Node.js for stability
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (change this if your app uses a different port)
EXPOSE 8000

# Start the application
CMD ["npm", "run", "dev"]