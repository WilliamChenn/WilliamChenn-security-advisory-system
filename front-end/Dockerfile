FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm install
# Ensure the @mui/material package is installed
#RUN npm install @mui/material



# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]

