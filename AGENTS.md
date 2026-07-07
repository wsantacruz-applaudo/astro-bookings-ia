# Agents Instructions

## Project Overview

Astro Bookings is a modern Node.js + TypeScript RESTful API for managing rocket lifecycle in the AstroBookings platform. It provides CRUD operations, state management, comprehensive e2e test coverage for the Rockets API, and standardized runtime observability through a shared logging utility.

Current version: **1.1.0**

Repository: https://github.com/wsantacruz-applaudo/astro-bookings-ia

## Technical Implementation

### Tech Stack
- Language: **TypeScript 5.4.5**
- Framework: **Express 5.2.1**
- Testing: **Vitest 4.1.9**
- Runtime: **Node.js 26.4.0+**

### Development Workflow

```bash
# Set up the project
npm install

# Build the project
npm run build

# Run the project in development mode
npm run dev

# Run the project in production mode
npm start

# Run the test suite
npm test

# Run tests with UI
npm run test:ui

# Clean build artifacts
npm run clean
```

### Folder structure

```text
astro-bookings/                   # Project root
  - AGENTS.md                     # This file with instructions for AI agents
  - package.json                  # Project metadata and dependencies
  - README.md                     # Main human documentation
  - tsconfig.json                 # TypeScript compiler configuration
  - vitest.config.ts              # Test runner configuration
  - CHANGELOG.md                  # Release notes and version history
  - src/                          # TypeScript source files
    - index.ts                    # Application entry point
    - routes/
      - rockets.ts                # Rockets API endpoints
    - services/
      - rocket-service.ts         # Business logic and validation
    - utils/
      - logger.ts                 # Shared console logging utility
    - types/
      - rocket.ts                 # TypeScript type definitions
    - tests/
      - rockets.e2e.test.ts       # E2E test suite (18 tests)
  - specs/                        # Specification documents
    - rockets/
      - spec.md                   # Complete API specification
  - dist/                         # Compiled JavaScript output
```

### Logger Utility (`src/utils/logger.ts`)

All modules use the shared logger instead of raw `console.log`. No external logging packages are used.

**Log format:**
```
[ISO-timestamp] LEVEL context - message {"optional":"data"}
```

**Exported functions:**
```ts
import { log, info, warn, error, debug } from './utils/logger.js';

log('INFO', 'context', 'message', { key: 'value' }); // generic
info('context', 'message', { key: 'value' });         // INFO level
warn('context', 'message', { key: 'value' });         // WARN level
error('context', 'message', { key: 'value' });        // ERROR level
debug('context', 'message', { key: 'value' });        // DEBUG level
```

**Log levels:** `INFO` | `WARN` | `ERROR` | `DEBUG`

Use the `context` parameter as `module:operation` (e.g., `rockets:create`, `rocket-service:update`).

### HTTP Endpoints

In addition to the Rockets API, the server exposes:

| Method | Path      | Description                                          |
|--------|-----------|------------------------------------------------------|
| GET    | `/`       | Returns API info and list of available endpoints     |
| GET    | `/health` | Returns server health, uptime, and environment info  |
| POST   | `/rockets`| Create a new rocket                                  |
| GET    | `/rockets`| List all rockets                                     |
| GET    | `/rockets/:id` | Get a rocket by ID                              |
| PUT    | `/rockets/:id` | Update a rocket by ID                           |
| DELETE | `/rockets/:id` | Delete a rocket by ID                           |

## Environment

- Code and documentation are in English.
- Chat responses should match the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- Default branch is `main`.
- The application runs on Node.js with Express server.
- Environment variables: PORT (defaults to 3000), NODE_ENV.
