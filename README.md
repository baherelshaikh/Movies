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
    npm start

## Features
- User authentication and authorization
- Movie management (CRUD operations)
- Middleware for error handling and not found routes
- Request logging using Morgan
- Security enhancements including rate limiting, helmet, xss-clean, and mongo-sanitize

## Usage
Once the app is running, you can access the following endpoints:

## Endpoints

## Authentication
- POST /api/v1/auth/register - Register a new user
- POST /api/v1/auth/login - Login an existing user
- GET /api/v1/auth/logout - Logout the user

## Users
- GET /api/v1/user/showMe - Get user profile

## Movies
- GET /api/v1/movie/all/:divisionName - Get a list of movies
- GET /api/v1/movie/:id - Get a specific movie by ID
- GET /api/v1/movie/displayMovie/:id - display a specific movie by ID

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
