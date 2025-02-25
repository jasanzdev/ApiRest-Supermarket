# API Gateway Express Supermarket 🛒

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

An application built with **Express.js** and **TypeScript**, featuring an API Gateway implemented using **http-proxy-middleware** to route requests across microservices. Communication between services is handled via **Axios**. The current microservices include **Authentication**, **Products**, and **Users**, with **PostgreSQL** as the database. This project demonstrates a scalable microservices architecture for a supermarket system.

---

## Features 🚀

- **API Gateway**: Centralized entry point for routing requests using `http-proxy-middleware`.
- **Microservices Architecture**:
  - **Authentication Service**: Manages user login and registration using **JWT** for secure authentication 👤
  - **Products Service**: Handles product listings and inventory 🛒
  - **Users Service**: Manages user profiles and data
- **Database**: PostgreSQL for persistent storage.
- **Communication**: Axios for inter-service communication 🔗
- **Logging**: **Winston** for structured and centralized logging across services.
- **Authentication**: **JWT** (JSON Web Tokens) for secure user authentication and authorization.
- **Scalability**: Designed to support additional microservices in the future.
- **Dockerized**: Containerized for easy deployment and development.

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

### Running with Docker 🐳
1. Build the Docker images: docker-compose build
2. Start the containers: docker-compose up

### This will start the following services:

API Gateway on port 3000

Authentication Service on port 4000

Products Service on port 4001

PostgreSQL database

##API Endpoints 🌐

###API Gateway
GET /products: Fetch all products.

POST /auth/register: Register a new user.

POST /auth/login: Log in and receive a JWT token.

###Authentication Service
POST /auth/register: Register a new user.

POST /auth/login: Log in and receive a JWT token.

###Products Service
GET /products: Fetch all products.

POST /products: Create a new product.

PATCH /products/:id : Update a product.

DELETE /products/:id : Delete a product.

Users Service
GET /users: Fetch all users.

GET /users/:id : Fetch a specific user by ID.

PATCH /users/:id : Update a user's profile.

DELETE /users/:id : Delete a user.
