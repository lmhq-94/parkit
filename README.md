# 🚗 ParkIt - Smart Parking Management System

A comprehensive parking management platform built with modern technologies and best practices.

## 🏗️ Architecture

This is a **monorepo** built with **Turborepo** containing:

- **Backend**: Node.js + Express + GraphQL + Prisma + PostgreSQL
- **Frontend**: Next.js + React + TypeScript + Tailwind CSS
- **Mobile**: React Native + Expo + TypeScript
- **Shared**: Common utilities, types, and UI components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn 1.22+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/parkit.git
   cd parkit
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development environment**
   ```bash
   # Start all services with Docker
   docker-compose up -d
   
   # Or start individual services
   yarn dev:backend
   yarn dev:web
   yarn dev:mobile
   ```

## 📁 Project Structure

```
parkit/
├── apps/
│   ├── backend/          # Express + GraphQL API
│   ├── web/             # Next.js frontend
│   └── mobile/          # React Native app
├── packages/
│   ├── config/          # Shared configurations
│   ├── shared/          # Common utilities
│   ├── types/           # TypeScript types
│   └── ui/              # UI components
├── docker-compose.yml   # Development environment
└── turbo.json          # Build pipeline
```

## 🛠️ Development

### Backend Development

```bash
cd apps/backend

# Install dependencies
yarn install

# Run database migrations
yarn prisma migrate dev

# Start development server
yarn dev

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage
```

### Frontend Development

```bash
cd apps/web

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Mobile Development

```bash
cd apps/mobile

# Install dependencies
yarn install

# Start Expo development server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

## 🧪 Testing

### Backend Tests

```bash
cd apps/backend

# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test AuthController.test.ts

# Run tests in watch mode
yarn test:watch
```

### Frontend Tests

```bash
cd apps/web

# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage
```

## 🚀 Deployment

### Production Build

```bash
# Build all applications
yarn build

# Build specific app
yarn build:backend
yarn build:web
yarn build:mobile
```

### Docker Deployment

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f
```

## 📊 API Documentation

### GraphQL Playground
- **Development**: http://localhost:4000/graphql
- **Production**: https://api.parkit.com/graphql

### REST API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/` - List users (admin only)
- `GET /api/users/:id` - Get user by ID

#### Parking
- `GET /api/parkings/` - List parking spots
- `GET /api/parkings/:id` - Get parking spot details
- `POST /api/parkings/` - Create parking spot
- `PUT /api/parkings/:id` - Update parking spot
- `DELETE /api/parkings/:id` - Delete parking spot

#### Reservations
- `GET /api/reservations/` - List reservations
- `GET /api/reservations/:id` - Get reservation details
- `POST /api/reservations/` - Create reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

#### Payments
- `GET /api/payments/` - List payments
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/` - Process payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Refund payment

## 🔧 Configuration

### Environment Variables

See `env.example` for all available environment variables.

### Database Schema

The database schema is managed with Prisma. Key entities:

- **Users**: User accounts and authentication
- **Roles**: User roles and permissions
- **Companies**: Business entities
- **ParkingSpots**: Available parking locations
- **Reservations**: Parking reservations
- **Payments**: Payment transactions
- **Vehicles**: User vehicles
- **QR Codes**: QR codes for parking spots

## 🛡️ Security

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Permission-based authorization
- Refresh token rotation
- Password hashing with bcrypt

### Security Headers

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation with Zod
- SQL injection prevention with Prisma

## 📈 Monitoring & Logging

### Logging

- Winston logger with structured logging
- Request/response logging
- Error tracking with Sentry
- Performance monitoring

### Health Checks

- `/health` endpoint for service health
- Database connectivity checks
- Redis connectivity checks
- External service health checks

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation

3. **Run tests and linting**
   ```bash
   yarn lint
   yarn test
   yarn type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent code formatting
- **Commitlint**: Conventional commits
- **Husky**: Git hooks for quality checks

## 📝 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.

### License Summary

- **Freedom to Use**: You can use this software for any purpose
- **Freedom to Study**: You can examine how the software works
- **Freedom to Modify**: You can change the software to suit your needs
- **Freedom to Share**: You can distribute copies of the software
- **Network Use**: If you run a modified version on a server, you must make the source code available to users

### Key Requirements

1. **Source Code Availability**: Any modified version must include the source code
2. **Network Interaction**: If users interact with the software over a network, they must have access to the source code
3. **License Notice**: All copies must include the license and copyright notice
4. **No Warranty**: The software is provided "as is" without warranty

For more information about the AGPL-3.0 license, visit: https://www.gnu.org/licenses/agpl-3.0.en.html

## 🆘 Support

- **Documentation**: [docs.parkit.com](https://docs.parkit.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/parkit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/parkit/discussions)
- **Email**: support@parkit.com

## 🙏 Acknowledgments

- [Turborepo](https://turborepo.com) for monorepo management
- [Prisma](https://prisma.io) for database ORM
- [Apollo GraphQL](https://www.apollographql.com) for GraphQL server
- [Next.js](https://nextjs.org) for React framework
- [Expo](https://expo.dev) for React Native development
- [Tailwind CSS](https://tailwindcss.com) for styling
