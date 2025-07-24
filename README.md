# NestJS Admin API

A powerful admin panel backend built with NestJS and TypeScript, providing comprehensive admin functionality for the microservices ecosystem.

## 🚀 Features

- **TypeScript-First** - Full TypeScript support with strong typing
- **Swagger Documentation** - Auto-generated API documentation
- **User Management** - Complete CRUD operations for users
- **Role-Based Access** - Granular permission system
- **Database Integration** - TypeORM with MySQL support
- **JWT Authentication** - Secure API authentication
- **Health Monitoring** - Built-in health check endpoints
- **Input Validation** - Comprehensive request validation
- **Exception Handling** - Global error handling

## 📋 Requirements

- Node.js 18+
- npm or yarn
- MySQL 8.0+
- Redis (for caching and sessions)

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run start:dev

# Run in watch mode
npm run start:dev
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 🔍 Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Run Prettier formatting
npm run format

# Check Prettier formatting
npm run format:check
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/profile` - Get admin profile

### User Management
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health & Monitoring
- `GET /api/healthz` - Health check endpoint
- `GET /api/status` - Service status information
- `GET /api/docs` - Swagger API documentation

## 🔧 Configuration

Key environment variables:
```env
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=admin
DB_PASSWORD=password
DB_DATABASE=admin_db
JWT_SECRET=your-secret-key
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 📊 API Documentation

The API documentation is automatically generated and available at:
- **Swagger UI**: `http://localhost:4000/api/docs`
- **OpenAPI JSON**: `http://localhost:4000/api/docs-json`

## 🚀 Deployment

This service is automatically deployed via the CI/CD infrastructure repository. The deployment pipeline:

1. Pulls source code from this repository
2. Installs dependencies and runs tests
3. Runs linting and code quality checks
4. Builds the application
5. Creates Docker image
6. Deploys to Kubernetes cluster
7. Runs health checks and API tests

## 📊 Monitoring

- Health endpoint: `/api/healthz`
- Status endpoint: `/api/status`
- Metrics: Available via Prometheus (if configured)
- Logs: Structured logging with Winston

## 🏗️ Architecture

```
src/
├── auth/              # Authentication module
├── users/             # User management module
├── common/            # Shared utilities
├── config/            # Configuration files
├── database/          # Database configuration
├── guards/            # Auth guards
├── interceptors/      # Request/response interceptors
├── pipes/             # Validation pipes
└── main.ts            # Application entry point
```

## 🧪 Testing Strategy

- **Unit Tests**: Testing individual components
- **Integration Tests**: Testing module interactions
- **E2E Tests**: Testing complete API workflows
- **Coverage**: Maintaining >80% test coverage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes with comprehensive tests
4. Ensure code quality (`npm run lint && npm run test`)
5. Submit pull request

## 📝 License

MIT License - see LICENSE file for details. 