# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-01

### Added

- **Rockets API**: Complete RESTful API for managing rocket lifecycle in the AstroBookings platform
  - `POST /rockets` - Create new rockets with validation of required fields (name, capacity, status, range)
  - `GET /rockets` - Retrieve list of all rockets in JSON format
  - `GET /rockets/:id` - Retrieve details of a specific rocket by ID
  - `PUT /rockets/:id` - Update rocket information including status and capacity
  - `DELETE /rockets/:id` - Remove decommissioned or obsolete rockets from the system

- **Rocket Data Model**: Type-safe Rocket interface with the following properties:
  - `id`: Unique identifier (auto-generated)
  - `name`: Rocket name (string, required)
  - `capacity`: Number of passengers (positive number, required)
  - `status`: Operational status - 'available', 'in-flight', or 'maintenance' (required)
  - `range`: Maximum range in km (positive number, required)

- **Business Logic & Validations**:
  - Automatic validation of all required fields during creation and updates
  - Prevention of capacity modification when rocket status is 'in-flight'
  - State-driven filtering logic for maintenance and booking operations
  - Unique ID generation for each rocket resource

- **HTTP Status Codes**:
  - `201 Created` - Successful rocket creation
  - `200 OK` - Successful retrieval or update operations
  - `204 No Content` - Successful deletion
  - `400 Bad Request` - Validation failures or invalid operations
  - `404 Not Found` - Attempts to access non-existent rockets

- **E2E Test Suite**: Comprehensive test coverage with 18 automated tests covering:
  - Creation with valid and invalid data
  - Retrieval operations (all rockets and by ID)
  - Update operations and status transitions
  - Deletion operations
  - Business logic validation (maintenance status, in-flight state, booking eligibility)
  - Complete property validation in responses

### Testing

- Implemented 18 e2e tests using Vitest
- All tests passing (100% coverage of acceptance criteria)
- Tests validate event-driven, action-driven, state-driven, and result-driven criteria

### Documentation

- Comprehensive specification in `specs/rockets/spec.md`
- API usage examples and endpoints documented in README.md
- Type definitions in `src/types/rocket.ts`
- Service layer with RocketService class in `src/services/rocketService.ts`
- Dedicated router with request handlers in `src/routes/rockets.ts`

### Project Dependencies

- Express 5.2.1 for HTTP server
- TypeScript 5.4.5 for type-safe implementation
- Vitest 4.1.9 for testing framework
