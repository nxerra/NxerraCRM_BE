FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production 

# Install nodemon globally
RUN npm install -g nodemon

# Copy source code
COPY . .

# Expose app port
EXPOSE 5000

# Start using nodemon
CMD ["npm", "run", "dev"]


