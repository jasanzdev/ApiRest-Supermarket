# API Gateway Express Supermarket 🛒

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

An application built with **Express.js** and **TypeScript**, featuring an API Gateway implemented using **http-proxy-middleware** to route requests across microservices. Communication between services is handled via **Axios**. The current microservices include **Authentication**, **Products**, and **Users**, with **PostgreSQL** as the database. This project demonstrates a scalable microservices architecture for a supermarket system.

---

## Features 🚀

- **API Gateway**: Centralized entry point for routing requests using `http-proxy-middleware`.
- **Microservices Architecture**:
  - **Authentication Service**: Manages user login and registration 👤
  - **Products Service**: Handles product listings and inventory 🛒
  - **Users Service**: Manages user profiles and data
- **Database**: PostgreSQL for persistent storage.
- **Communication**: Axios for inter-service communication 🔗
- **Scalability**: Designed to support additional microservices in the future.

---

## Technologies Used 💻

- **Node.js** & **Express.js**: Backend framework for building the API Gateway and microservices.
- **TypeScript**: Adds type safety and enhances code quality.
- **http-proxy-middleware**: Used to implement the API Gateway for routing requests.
- **Axios**: Handles HTTP requests between microservices.
- **PostgreSQL**: Relational database for storing application data.
- **Docker** (optional): For containerizing the application.
>>>>>>> 99030e04b0e049b52adb282857e87e76b2508695
