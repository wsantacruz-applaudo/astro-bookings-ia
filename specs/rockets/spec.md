# Rockets API Specification

## Problem Description

### User Stories

1. As a **travel operator**, I want to **create and register new rockets in the system** so that **I can make them available for bookings in the AstroBookings platform**.

2. As a **booking system**, I want to **query available rockets based on capacity and range** so that **I can match user travel requests with suitable spacecraft**.

3. As a **fleet manager**, I want to **update rocket status and maintain their operational information** so that **the system accurately reflects which rockets are operational, in maintenance, or in-flight**.

## Solution Overview

The Rockets API will provide a RESTful endpoint to manage rocket lifecycle in the AstroBookings application. The API will support CRUD operations (Create, Read, Update, Delete) on rocket resources with the following capabilities:

- **Create rockets** with initial properties: name, capacity, status, and range
- **Retrieve rockets** individually or in bulk, with filtering by status and range
- **Update rocket information** including status changes for operational tracking
- **Delete rockets** from the system (for decommissioned or obsolete spacecraft)

The API will validate all rocket properties, ensure data consistency, and provide clear error responses for invalid operations. The system will maintain an in-memory or persistent storage of rocket records and support filtering operations for efficient resource discovery.

## Acceptance Criteria

### Event-Driven Criteria
- [ ] **When** a POST request is received with valid rocket data **Then** a new rocket is created and stored with a unique identifier
- [ ] **When** a rocket's status is updated to "maintenance" **Then** the system prevents it from being assigned to new bookings
- [ ] **When** a DELETE request is received for a rocket **Then** the rocket is removed from the system

### Action-Driven Criteria
- [ ] **When** creating a rocket **Then** all required fields (name, capacity, status, range) must be provided and validated
- [ ] **When** retrieving rockets **Then** the API returns a list of rockets with their complete properties in JSON format
- [ ] **When** updating a rocket's capacity or range **Then** the system validates the new values and persists the changes

### State-Driven Criteria
- [ ] **If** a rocket has status "available" **Then** it may be assigned to bookings
- [ ] **If** a rocket has status "in-flight" **Then** its capacity cannot be modified
- [ ] **If** a rocket has status "maintenance" **Then** it should not appear in available rocket queries

### Result-Driven Criteria
- [ ] The system shall respond with HTTP 201 (Created) when a rocket is successfully created
- [ ] The system shall respond with HTTP 200 (OK) when a rocket is successfully retrieved or updated
- [ ] The system shall respond with HTTP 404 (Not Found) when attempting to access or modify a non-existent rocket
- [ ] The system shall respond with HTTP 400 (Bad Request) when validation fails due to invalid properties
- [ ] The system shall return complete rocket objects with id, name, capacity, status, and range in all responses
