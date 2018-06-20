# production build dockerfile
FROM node:8

# Create the directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle the app src
COPY . .

# build application
RUN npm run build

# Expose the port and run application
EXPOSE 3000
CMD ["npm", "run", "prod"]
