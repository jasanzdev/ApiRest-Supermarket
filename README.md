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
- **Security & Logging**:
  - `helmet` for security enhancements.  
  - `winston` and `winston-daily-rotate-file` to log the last 7 days of activity.  
  - Each microservice has its own `logs/` directory with separate log levels: `info`, `debug`, `error`.  
- **User Sessions & Roles**:
  - **User sessions are based on the User-Agent**.  
  - **GET requests do not require authentication**.  
  - **POST, PATCH, DELETE require `ADMIN` or `SUPERVISOR` roles**.  
  - Available roles: `ADMIN`, `SUPERVISOR`, `OPERATOR`, and `USER`.  
  - **If no role is specified, the user is created with the `USER` role**.  
- **Authentication**:
  - **JWT-based authentication** (`jsonwebtoken`).  
  - **Session management** using PostgreSQL.  
  - **Zod is used for validation in all microservices**.  
  - **Access Token** is stored in the `Authorization` header.  
  - **Refresh Token** is stored in cookies for session continuity.  
- **Service Communication**:
  - `axios` is used for microservice-to-microservice communication.  

---
## 🏗️ Project Structure 

RestFullAPI-Supermarket/
│── api-gateway/ # API Gateway (entry point)
│ ├── src/
│ ├── Dockerfile
│ ├── package.json
│── authentication/ # Authentication microservice
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

---
## Technologies Used 💻

- **Node.js** & **Express.js**: Backend framework for building the API Gateway and microservices.
- **TypeScript**: Adds type safety and enhances code quality.
- **http-proxy-middleware**: Used to implement the API Gateway for routing requests.
- **Axios**: Handles HTTP requests between microservices.
- **PostgreSQL**: Relational database for storing application data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Winston**: Logging library for structured and centralized logs.
- **Docker**: For containerizing the application and simplifying deployment.

## Getting Started 🛠️

### Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

