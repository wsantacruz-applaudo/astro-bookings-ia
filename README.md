# Astro Bookings

Repository: https://github.com/wsantacruz-applaudo/astro-bookings-ia

A modern Node.js + TypeScript application providing a RESTful API for managing rocket lifecycle in the AstroBookings platform. Version 1.1.0 includes the complete Rockets API with CRUD operations, state management, comprehensive e2e test coverage, and standardized runtime logging.

## Features

### Rockets API (v1.0.0)

- **Create Rockets**: Add new rockets to the system with automatic validation
- **Query Rockets**: Retrieve all rockets or search by ID
- **Update Rockets**: Modify rocket properties and manage operational status
- **Delete Rockets**: Remove decommissioned or obsolete spacecraft
- **State Management**: Prevent invalid operations based on rocket status (in-flight, maintenance, available)
- **Validation**: Automatic validation of all required fields and business rules

### Observability (v1.1.0)

- **Standardized Logging Utility**: Shared logger at `src/utils/logger.ts`
- **Consistent Log Shape**: `[timestamp] LEVEL context - message {optionalData}`
- **Server Logging**: Startup, shutdown, unhandled rejection, and uncaught exception events
- **Route Logging**: Entry, success, validation failures, not found results, and unexpected errors
- **Service Logging**: Validation flow tracing and status transition logs

## Project Structure

```
astro-bookings/
├── src/                           # TypeScript source files
│   ├── index.ts                   # Application entry point
│   ├── routes/
│   │   └── rockets.ts             # Rockets API endpoints
│   ├── services/
│   │   └── rocket-service.ts       # Business logic & validation
│   ├── types/
│   │   └── rocket.ts              # TypeScript type definitions
│   └── tests/
│       └── rockets.e2e.test.ts    # E2E test suite (18 tests)
├── specs/
│   └── rockets/
│       └── spec.md                # Complete API specification
├── dist/                          # Compiled JavaScript output
├── package.json                   # Project configuration & dependencies
├── tsconfig.json                  # TypeScript compiler configuration
├── vitest.config.ts               # Test runner configuration
├── CHANGELOG.md                   # Release notes & version history
├── .gitignore                     # Git ignore rules
├── package-lock.json              # Locked dependency versions
└── README.md                      # This file
```

## Setup

### Prerequisites

- Node.js 26.4.0+
- npm 10.x+

### Installation

If npm is not in your PATH, you may need to set it up:

```bash
export PATH="/usr/local/Cellar/node/26.4.0/bin:$PATH"
```

Dependencies are already installed via `npm install`. To reinstall:

```bash
npm install
```

## Available Scripts

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

Output goes to the `dist/` directory with source maps and type declarations.

### Development

Run the application in watch mode with hot-reload:

```bash
npm run dev
```

The server will start on port 3000 (or custom `PORT` environment variable).

### Production

Build and run the production version:

```bash
npm run build
npm start
```

### Testing

Run the complete e2e test suite (18 tests):

```bash
npm test
```

Run tests with UI dashboard:

```bash
npm run test:ui
```

All tests validate the acceptance criteria from the Rockets API specification. Test results show:
- ✓ 18 tests passing
- ✓ 100% acceptance criteria coverage
- ✓ Event-driven, action-driven, state-driven, and result-driven criteria validated

### Clean

Remove the compiled output:

```bash
npm run clean
```

## Rockets API Usage

### Base URL

```
http://localhost:3000/rockets
```

### Endpoints

#### Create a Rocket
```bash
POST /rockets
Content-Type: application/json

{
  "name": "Apollo-1",
  "capacity": 5,
  "status": "available",
  "range": 1000
}
```

**Response (201 Created):**
```json
{
  "id": "1",
  "name": "Apollo-1",
  "capacity": 5,
  "status": "available",
  "range": 1000
}
```

#### Get All Rockets
```bash
GET /rockets
```

**Response (200 OK):**
```json
[
  {
    "id": "1",
    "name": "Apollo-1",
    "capacity": 5,
    "status": "available",
    "range": 1000
  }
]
```

#### Get Rocket by ID
```bash
GET /rockets/1
```

**Response (200 OK):**
```json
{
  "id": "1",
  "name": "Apollo-1",
  "capacity": 5,
  "status": "available",
  "range": 1000
}
```

#### Update Rocket
```bash
PUT /rockets/1
Content-Type: application/json

{
  "status": "maintenance"
}
```

**Response (200 OK):**
```json
{
  "id": "1",
  "name": "Apollo-1",
  "capacity": 5,
  "status": "maintenance",
  "range": 1000
}
```

#### Delete Rocket
```bash
DELETE /rockets/1
```

**Response (204 No Content)** - No body returned

### Rocket Status Values

- `available` - Rocket is ready for bookings
- `in-flight` - Rocket is currently in operation (capacity cannot be modified)
- `maintenance` - Rocket is in maintenance and not available for bookings

### Validation Rules

- **name**: Required, must be a non-empty string
- **capacity**: Required, must be a positive number
- **status**: Required, must be one of: `available`, `in-flight`, `maintenance`
- **range**: Required, must be a positive number
- **Capacity Lock**: Cannot modify capacity when status is `in-flight`

### Error Responses

**400 Bad Request** - Validation failed:
```json
{
  "error": "Bad Request",
  "message": "Capacity must be a positive number"
}
```

**404 Not Found** - Rocket does not exist:
```json
{
  "error": "Not Found",
  "message": "Rocket with id 99 not found"
}
```

## Health Check

```bash
GET /health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-07-01T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

## Version History

### v1.1.0 (2026-07-06) - Observability Release
- ✓ Added shared console logger with `INFO`, `WARN`, `ERROR`, `DEBUG` levels
- ✓ Added logging across server lifecycle and process-level error handlers
- ✓ Added route and service flow logs for key Rockets API operations
- ✓ No external dependencies introduced

### v1.0.0 (2026-07-01) - Initial Release
- ✓ Complete Rockets API with CRUD operations
- ✓ 18 comprehensive e2e tests (all passing)
- ✓ Type-safe TypeScript implementation
- ✓ Input validation and business logic
- ✓ Full API documentation

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

### Development Mode

Run TypeScript with hot-reload during development:

```bash
npm run dev
```

### Start

Run the compiled JavaScript server:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Clean

Remove compiled output:

```bash
npm run clean
```

## API Endpoints

### Health Check
- **GET** `/health`
  - Returns server health status with uptime and environment info
  - Response (200):
    ```json
    {
      "status": "healthy",
      "timestamp": "2026-06-30T12:00:00.000Z",
      "uptime": 5.234,
      "environment": "development"
    }
    ```

### Welcome/Root
- **GET** `/`
  - Returns API information and available endpoints
  - Response (200):
    ```json
    {
      "message": "Welcome to Astro Bookings API",
      "version": "0.1.0",
      "endpoints": {
        "health": "/health"
      }
    }
    ```

### Error Handling
- Returns 404 for unknown routes
- Returns 500 for server errors with error details

## Configuration

### Dependencies

- **express** (v4.x) - Web application framework
- **@types/express** (dev) - TypeScript type definitions for Express

### TypeScript (`tsconfig.json`)

- **Target**: ES2020
- **Module**: ES2020 (ESM)
- **Strict Mode**: Enabled
- **Source Maps**: Enabled
- **Declarations**: Enabled

### Package.json

- **Type**: "module" (ES Modules)
- **Main Entry**: dist/index.js
- **Node Version**: 26.4.0+

## Development

1. Edit files in the `src/` directory
2. Run `npm run dev` for live development with hot-reload
3. Run `npm run build` to compile for production
4. Use `npm start` to run the compiled code

## Notes

- The project uses ES modules (ESM) for modern JavaScript
- TypeScript strict mode is enabled for type safety
- Source maps are generated for debugging
- Type declarations are generated for library usage
