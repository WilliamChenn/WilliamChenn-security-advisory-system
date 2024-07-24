FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Change permissions to allow all users read, write, and execute access
RUN chmod -R 777 /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY ./front-end/package.json ./front-end/package-lock.json ./

# Copy the rest of the application files
COPY ./front-end ./



# Install dependencies
RUN npm install
# Ensure the @mui/material package is installed
#RUN npm install @mui/material



# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]

