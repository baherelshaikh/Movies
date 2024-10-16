# Movie App

A robust and scalable movie application that leverages Node.js, Express, MongoDB, and various security measures to ensure a smooth and safe experience.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>

2. **Install dependencies**
    ```bash
    npm install

2. **Set environment variables,** 
**Create a .env file in the root directory and add the following:**
    ```bash
    MONGODB_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    PORT=<Your Preferred Port>

3. **Run the application**
    ```bash
    node app.js


## Features
- User authentication and authorization
- Movie management (CRUD operations)
- Middleware for error handling and not found routes
- Request logging using Morgan
- Security enhancements including rate limiting, helmet, xss-clean, and mongo-sanitize

## Usage
Once the app is running, you can access the following endpoints:

## Endpoints
https://watchy.up.railway.app/api/v1 + one of the following

## Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login an existing user
- GET  /auth/logout - Logout the user

## Users
- GET /user/showMe - Get user profile

## Movies
- GET /movie/all/:divisionName - Get a list of movies  
  ( you have 5 divisions ["movies", "TopRated", "upComing", "TVSeries", "trending"] and "all" if you want all divisions )
- GET /movie/:id - Get a specific movie by ID
- GET /movie/displayMovie/:id - display a specific movie by ID

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Morgan
- Helmet
- cors
- xss-clean
- express-rate-limit
- express-mongo-sanitize

**(I'm currently working on this project ... )**
