# API Gateway Express Supermarket 🛒

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

An application built with **Express.js** and **TypeScript**, featuring an API Gateway implemented using **http-proxy-middleware** to route requests across microservices. Communication between services is handled via **Axios**. The current microservices include **Authentication**, **Products**, and **Users**, with **PostgreSQL** as the database. This project demonstrates a scalable microservices architecture for a supermarket system.

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
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2.**Install dependencies**:
```bash
npm install
```

3.**Configure the environment variables (.env file):**:
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

#This will start the following services:

- **API Gateway on port 3000**
- **Authentication Service on port 4000**
- **Products Service on port 4001**
- **Users Service on port 4002**
- **PostgreSQL database**
   
3. **Stop the containers**:
    ```bash
   docker-compose down
