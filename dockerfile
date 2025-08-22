FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run Next.js in dev mode
CMD ["npm", "run", "dev"]
