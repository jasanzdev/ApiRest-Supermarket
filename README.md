# 🛒 Supermarket Microservices API

A modern microservices-based REST API for managing supermarket operations.

## 📋 Description

This project implements a distributed system using microservices architecture to handle supermarket operations. The system is designed with scalability and maintainability in mind, separating concerns into independent services that follow the Model-View-Controller (MVC) design pattern and communicate through an API Gateway.

## 🏗️ Architecture

The system consists of the following components:

### API Gateway
- Central entry point for all client requests
- Request routing and load balancing
- Authentication and authorization validation
- Rate limiting and caching
- Security and Headers
- Error Handling
- Performance Monitoring

### Microservices
1. **Authentication Service**
   - User authentication and authorization
   - User session management
   - JWT token management
   - Security policies

2. **Products Service**
   - Product catalog management
   - Inventory control
   - Category handling
   - Price management
   - Stock updates

3. **Users Service**
   - User management
   - Customer information
   - Role management
   - Password management

4. **Order Processing Service**
   - Shopping cart management
   - Order creation and processing
   - Order status tracking
   - Purchase history

## 🚀 Features

- Distributed system architecture
- Service isolation and independence
- Scalable microservices
- Centralized authentication
- Inter-service communication
- Distributed data management
- Service monitoring and logging

## 🛠️ Technologies Used

- **Node.js** -- `(Runtime for server-side JavaScript, enabling scalable and efficient applications.)`
- **Express.js** -- `(Framework for building APIs and handling HTTP requests, routing, and middleware.)`
- **PostgreSQL** -- `(Relational database for structured data storage and management.)`
- **MongoDB** -- `(NoSQL database for flexible, schema-less data storage and high scalability.)`
- **Redis** -- `(In-memory data store used for caching to improve performance.)`
- **Axios** -- `(HTTP client for making requests to external or internal APIs.)`
- **Winston** -- `(Logging library for structured and customizable application logging.)`
- **Zod** -- `(TypeScript-first library for schema validation and data integrity.)`
- **Express-validator** -- `(Middleware for validating and sanitizing incoming request data.)`
- **Express-rate-limit** -- `(Middleware to limit request rates and prevent abuse.)`
- **Helmet** -- `(Middleware to secure HTTP headers and protect against common vulnerabilities.)`
- **http-proxy-middleware** -- `(Middleware for routing requests to other servers or services.)`
- **JWT for authentication** -- `(Token-based authentication for secure user verification and authorization.)`
- **Docker & Docker Compose** -- `(Containerization tools for consistent deployment across environments.)`
- **Swagger** -- `(Framework for API documentation and interactive testing.)`

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jasanzdev/ApiRest-Supermarket.git
```

2. Install dependencies for all services:
```bash
   cd ApiRest-Supermarket/
   npm install
```
3. Copy the .env.example file and rename it to .env:
```bash
   cp .env.example .env
```
4. Open the .env file in your preferred text editor and set the variable values ​​as needed.

## 🖥️ Start Services
1. Start Redis
   ```bash
   docker compose up -d redis
   ```
2. Start MongoDB
   ```bash
   docker compose up -d mongodb
   ```
3. Start Postgres
   ```bash
   docker compose up -d postgresProducts
   docker compose up -d postgresUsers
   ```
4. Start Services
   1. Gateway
      ```bash
      cd .\api-gateway\
      npm run build
      npm run start
      ```
   2. Authenticate
      ```bash
      cd .\microservices\authenticate\
      npm run build
      npm run start
      ```
   3. products
      ```bash
      cd .\microservices\products\
      npm run build
      npm run start
      ```
   4. users
      ```bash
      cd .\microservices\users\
      npm run build
      npm run start
      ```
   5. order-processing
      ```bash
      cd .\microservices\order-processing\
      npm run build
      npm run start
      ```

## 📚 API Documentation

API documentation for each service is available at:
```
http://localhost:3000/supermarket/docs/
```

## 🔍 Main Endpoints

### Authentication Service
- `POST /supermarket/auth/login` - User login
- `POST /supermarket/auth/register` - User registration
- `POST /supermarket/auth/logout` - User Logout
- `POST /supermarket/auth/verify-token` - Verify Access Token
- `POST /supermarket/auth/refresh-token` - Refresh Access Token

### Products Service
- `GET /supermarket/products` - Get all products
- `GET /supermarket/products/categories` - Get all categories
- `GET /supermarket/products/search` - Improving search by product name and description
- `GET /supermarket/products/:id` - Get a specific product for id
- `GET /supermarket/products/code/:code` - Get a specific product for code
- `POST /supermarket/products` - Create a new product
- `PATCH /supermarket/products/:id` - Update a product
- `DELETE /supermarket/products/:id` - Delete a product
- `DELETE /supermarket/products/adjust-inventory/:id` - Adjust inventory for product id

### Users Service
- `GET /supermarket/users` - Get users
- `GET /supermarket/users/usernameOrEmail/:value` - Get user by email or username
- `GET /supermarket/users/:id` - Get user by id
- `POST /supermarket/users` - Add new user
- `PATCH /supermarket/users/:id` - Update user
- `PATCH /supermarket/users/resetPassword:id` - Reset a user´s password
- `DELETE /supermarket/users/:id` - Delete user

### Order Processing Service
- `GET /supermarket/purchase/cart` - Get user shopping cart
- `POST /supermarket/purchase/cart/add` - Add items to user cart
- `DELETE /supermarket/purchase/cart/remove/:amount?/:productId` - Remove item from user cart
- `DELETE /supermarket/purchase/cart/clear` - Clear user shopping cart
- `GET /supermarket/purchase/orders` - Get user orders
- `GET /supermarket/purchase/orders/:id` - Get specific order
- `POST /supermarket/purchase/orders` - Create new order
- `PATCH /supermarket/purchase/orders/:id` - Update status of user specific order

## 🔜 Next Steps
```
🔹 `Integrate OAuth with Google or Facebook`
🔹 `Integrate online payments`
🔹 `Send email notifications when placing an order`
🔹 `Confirm payments and update order status`
🔹 `Send confirmation emails to the user`
🔹 `Record payments in a history system`
🔹 `Inventory Alerts`
🔹 `Implements unit and EndToEnd test`
```
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✉️ Contact

Jose A Sanz - [@jasanzdev](https://github.com/jasanzdev)

Project Link: [https://github.com/jasanzdev/ApiRest-Supermarket](https://github.com/jasanzdev/ApiRest-Supermarket)
