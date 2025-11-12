FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make start script executable
RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]