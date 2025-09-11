# SWD392 BE - NestJS Backend API

This is a backend API for SWD392, built with [NestJS](https://nestjs.com/). It provides RESTful endpoints for user management, authentication, booking, products, orders, and more. The project uses a modular architecture and integrates with MongoDB via Mongoose.

## Features

- **Authentication & Authorization**: JWT-based authentication, role guards ([auth.guard.ts](src/auth/auth.guard.ts), [role.guard.ts](src/auth/role.guard.ts))
- **User Management**: CRUD operations for users ([user.controller.ts](src/controllers/user.controller.ts))
- **Booking System**: Manage bookings ([booking.controller.ts](src/controllers/booking.controller.ts))
- **Product & Promotion**: Products, product types, promotions, combos, and promoted products
- **Order & Payment**: Order management, payment integration
- **Blog & FAQ**: Blog posts, FAQs
- **Quiz & Question**: Quiz and question endpoints
- **Doctor & Schedule**: Doctor profiles and scheduling
- **Gemini Integration**: Gemini API endpoints
- **Rating & Membership**: Ratings and membership management

## Project Structure

```
src/
  main.ts
  auth/           # Auth guards
  controllers/    # REST API controllers
  dtos/           # Data transfer objects
  models/         # Mongoose models
  modules/        # NestJS modules
  repositories/   # Data access layer
  services/       # Business logic
test/             # End-to-end tests
```

## Getting Started

### Prerequisites

- Node.js v16+
- npm

### Installation

```sh
npm install
```

### Running the App

```sh
npm run start:dev
```

### Running Tests

```sh
npm run test
npm run test:e2e
```

## API Endpoints

See the controllers in [src/controllers](src/controllers) for available endpoints.

## Environment Variables

Configure your environment variables in a `.env` file. See `.env.example` for reference.