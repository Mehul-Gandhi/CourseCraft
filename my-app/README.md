
# Installation and Setup Guide

## Frontend Setup:

1. **Navigate to the Frontend Directory:**
`cd my-app`

2. **Install Dependencies:**
`npm install`

3. **Start the Frontend Server:**
`npm start`

This action will start the frontend application. It should automatically open in your default web browser. If not, you can manually access it by navigating to [http://localhost:3000](http://localhost:3000).

## Backend Setup:

1. **Navigate to the Backend Directory:**
`cd my-app/server`


2. **Install nodemon:**

If you haven't previously installed `nodemon`, install it globally using the following command:
`npm install -g nodemon`


3. **Create .env File:**

Create a `.env` file in the `server` directory. Add the following content, ensuring you replace `YOUR_MONGODB_URL` with the URL to your MongoDB server:

MONGO_CONNECT=YOUR_MONGODB_URL

Please note: your MongoDB server should utilize a collection named "schedules".

4. **Start the Backend Server:**
In my-app/server, run:
`npm start`


After following these steps, both your frontend and backend should be operational and able to communicate with each other.