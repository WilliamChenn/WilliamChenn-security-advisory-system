FROM node:18-alpine

# Set the working directory
WORKDIR /front-end/

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY public/ /front-end/public
COPY src/ /front-end/src

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
