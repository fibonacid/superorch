FROM node:alpine

# Create home directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
