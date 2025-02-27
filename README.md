# API Gateway Express for Supermarket System 🛒

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

This project is a **RESTful API**, built with **Express and TypeScript**. It follows a **microservices architecture**, using an **API Gateway** (`http-proxy-middleware`) as the single entry point for managing multiple microservices: **authentication, products, and users**, with **PostgreSQL** as the database.
The project is **fully containerized with Docker**, but can also be run locally. This project demonstrates a scalable microservices architecture for a supermarket system.
---

## Features 🚀

**API Gateway**: Manages request routing between microservices.  
- **Microservices Architecture**:
  - `authentication`: Handles user authentication and session management.
  - `products`: Manages product-related operations.
  - `users`: Manages user-related operations.
- **Service Communication**:
  - `axios` is used for microservice-to-microservice communication. 
- **Security & Logging**:
  - `helmet` for security enhancements.  
  - `winston` and `winston-daily-rotate-file` to log the last 7 days of activity.  
  - Each microservice has its own `logs/` directory with separate log levels: `info`, `debug`, `error`.  
- **User Sessions & Roles**:
  - **User sessions are based on the User-Agent**.  
  - **GET requests do not require authentication**.  
  - **POST, PATCH, DELETE require `ADMIN` or `MANAGER` roles**.  
  - Available roles: `ADMIN`, `MANAGER`, and `USER`.  
  - **If no role is specified, the user is created with the `USER` role**.  
- **Authentication**:
  - **JWT-based authentication** (`jsonwebtoken`).  
  - **Session management** using PostgreSQL.  
  - **Zod is used for validation in all microservices**.  
  - **Access Token** is stored in the `Authorization` header.  
  - **Refresh Token** is stored in cookies for session continuity.   

---
## 🏗️ Project Structure 
```
RestFullAPI-Supermarket/
│── api-gateway/ # API Gateway (entry point)
│ ├── src/
│ ├── Dockerfile
│ ├── package.json
│── authenticate/ # Authentication microservice
│ ├── src/
│ ├── logs/
│ ├── Dockerfile
│ ├── package.json
│── products/ # Products microservice
│ ├── src/
│ ├── logs/
│ ├── Dockerfile
│ ├── package.json
│── users/ # Users microservice
│ ├── src/
│ ├── logs/
│ ├── Dockerfile
│ ├── package.json
│── .env # Global environment variables
│── docker-compose.yml # Docker Compose configuration
│── package.json # Contains build/start scripts for all services
│── README.md
```
---
## 🏗️ Technologies Used

- **Backend**: Express, TypeScript, Node.js
- **API Gateway**: http-proxy-middleware
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: PostgreSQL
- **Validation**: Zod
- **Security**: Helmet
- **Logging**: Winston, Winston-Daily-Rotate-File
- **Communication**: Axios

## Getting Started 🛠️

### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jasanzdev/ApiRest-Supermarket.git
   cd ApiRest-Supermarket

2.**Install dependencies**:

   ```bash
   cd ./api-gateway
   npm install

   cd ./authenticate
   npm install

   cd ./products
   npm install

   cd ./users
   npm install
   ```

3.**Configure the globally environment variables (.env file on the root directory):**:
   ```bash
  # Gateway
    GATEWAY_PORT=3000

  # Authentication Service
    AUTH_PORT=4000
    JWT_ACCESS_SECRET_KEY=tu_secreto_jwt
    JWT_REFRESH_SECRET_KEY=tu_secreto_jwt

  # Products Service
    PRODUCTS_PORT=4001

  DATABASE_URL='postgres://postgres:Postgres123@postgres:5432/supermarket'

  SALT_ROUNDS=10
```

## Running with Docker 🐳
To run the application using Docker, follow these steps:

1. **Build the Docker images**:
   ```bash
   docker-compose build
   ```
   
2. **Start the containers**:
   ```bash
   docker-compose up

**Services will be available at:**:
- **A PostgreSQL database named supermarket will be created automatically**.
- **API Gateway → http://localhost:3000**
- **Authentication Service → http://localhost:4000**
- **Products Service → http://localhost:4001**
- **Users Service → http://localhost:4002**
   
3. **Stop the containers**:
    ```bash
   docker-compose down

## Running Locally (Without Docker)

1. **Start all services at once**:
   ```bash
   npm run build
   npm run start
   
**Services will be available at:**:
- **A PostgreSQL database named supermarket will be created automatically**.
- **API Gateway → http://localhost:3000**
- **Authentication Service → http://localhost:4000**
- **Products Service → http://localhost:4001**
- **Users Service → http://localhost:4002**


### API Endpoints 🌐
## Products Service

- **GET → http://localhost:3000/products**: Fetch all products.  
  **Query Parameters**:
  - `category` (optional): Filter products by category.  
  - `minStock` (optional): Filter products with stock greater than or equal to this value.  
  - `minPrice` (optional): Filter products with price greater than or equal to this value.  
  - `maxPrice` (optional): Filter products with price less than or equal to this value.  
- **GET → http://localhost:3000/products/:id**: Fetch a product.
- **POST → http://localhost:3000/products**: Create a new product.
- **PATCH → http://localhost:3000/products/:id**: Update a product.
- **DELETE → http://localhost:3000/products/:id**: Delete a product.

## Authentication Service
- **POST → http://localhost:3000/auth/login: Authenticate a user and generate a JWT token, Access Token and Refresh Token.  
- **POST → http://localhost:3000/auth/register: Register a new user and generate a JWT token, Access Token and Refresh Token.
- **POST → http://localhost:3000/auth/logout: Invalidate the user's current JWT token and delete sessions.
- **POST → http://localhost:3000/auth/verify-token: Verify the validity of a JWT token.
- **POST → http://localhost:3000/auth/refresh-token: Generate a new JWT token using a refresh token.
  
## Users Service
- **GET → http://localhost:3000/users**: Fetch all users.
- **GET → http://localhost:3000/users/:id**: Fetch a specific user by ID.
- **PATCH → http://localhost:3000/users/:id**: Update a user's profile.
- **DELETE → http://localhost:3000/users/:id**: Delete a user.
