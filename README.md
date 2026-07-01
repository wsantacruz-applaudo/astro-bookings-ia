# Astro Bookings

A modern Node.js + TypeScript bare-bones project setup.

## Project Structure

```
astro-bookings/
├── src/                  # TypeScript source files
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript output
├── package.json         # Project configuration & dependencies
├── tsconfig.json        # TypeScript compiler configuration
├── .gitignore          # Git ignore rules
├── package-lock.json   # Locked dependency versions
└── README.md           # This file
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
