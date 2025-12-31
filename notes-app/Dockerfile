# Step 1: Set the base image to Node.js 18.19.1
FROM node:18.19.1 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the React app to the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use a smaller image to serve the production build (nginx)
FROM nginx:alpine

# Step 8: Copy the build folder from the previous stage into the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 (default for nginx)
EXPOSE 80

# Step 10: Run nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]