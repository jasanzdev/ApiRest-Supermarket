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
- **Jest** -- `(Testing framework for unit, integration, and end-to-end testing.)`

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

3. Configure environment variables in the root directory:
```bash
.env
```

4. Start the services using Docker Compose:
```bash
docker-compose up
```

## 🔧 Configuration

Configure the following shared environment variables in the root directory:

```.env
# Gateway Service
GATEWAY_PORT=3000

# Authentication Service
AUTH_PORT=4000
JWT_ACCESS_SECRET_KEY=your_jwt_access_secret
JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret

# Products Service
PRODUCTS_PORT=4001

# Users Service
USER_PORT=4002
PASS_ADMIN=your_pass_admin_user
SALT_ROUNDS=10

# Order Processing Service
ORDER_PROCESSING_PORT=4003

DB_LOCAL_HOST=localhost
DB_LOCAL_PORT=postgres_port
DB_LOCAL_USER=postgres_user
DB_LOCAL_PASSWORD=postgres_password
DB_LOCAL_NAME=database_name

DATABASE_URL=postgres://postgres:Postgres123@postgres:5432/supermarket
REDIS_URL=redis://redis:6379

```

## 📚 API Documentation

API documentation for each service is available at:
```
Gateway: http://localhost:3000/api-docs
Authentication: http://localhost:3001/api-docs
Products: http://localhost:3002/api-docs
Users: http://localhost:3003/api-docs
Orders: http://localhost:3004/api-docs
```

## 🔍 Main Endpoints

### Authentication Service
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User Logout
- `POST /auth/verify-token` - Verify Access Token
- `POST /auth/refresh-token` - Refresh Access Token

### Products Service
- `GET /products` - Get all products
- `GET /products/categories` - Get all categories
- `GET /products/search` - Improving search by product name and description
- `GET /products/:id` - Get a specific product for id
- `GET /products/code/:code` - Get a specific product for code
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product
- `DELETE /products/adjust-inventory/:id` - Adjust inventory for product id

### Users Service
- `GET /users` - Get users
- `GET /users/usernameOrEmail/:value` - Get user by email or username
- `GET /users/:id` - Get user by id
- `POST /users` - Add new user
- `PATCH /users/:id` - Update user
- `PATCH /users/resetPassword:id` - Reset a user´s password
- `DELETE /users/:id` - Delete user

### Order Processing Service
- `GET /cart` - Get user shopping cart
- `POST /cart/add` - Add items to user cart
- `DELETE /cart/remove/:amount?/:productId` - Remove item from user cart
- `DELETE /cart/clear` - Clear user shopping cart
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get specific order
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update status of user specific order

## 🧪 Testing

To run tests for all services:
```bash
./scripts/test-all.sh
```

To test specific service:
```bash
cd services/<service-name>
npm run test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✉️ Contact

Jose A Sanz - [@jasanzdev](https://github.com/jasanzdev)

Project Link: [https://github.com/jasanzdev/ApiRest-Supermarket](https://github.com/jasanzdev/ApiRest-Supermarket)
