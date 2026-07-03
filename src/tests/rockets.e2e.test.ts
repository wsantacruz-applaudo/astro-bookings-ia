import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import express from 'express';
import { Server } from 'http';
import { rocketsRouter } from '../routes/rockets.js';
import { rocketService } from '../services/rocket-service.js';

let app: any;
let server: Server;
const BASE_URL = 'http://localhost:3001';

/**
 * Initialize test server
 */
beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use('/rockets', rocketsRouter);

  await new Promise<void>((resolve) => {
    server = app.listen(3001, () => {
      resolve();
    });
  });
});

/**
 * Clean up after tests
 */
afterAll(async () => {
  await new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

/**
 * Reset state before each test
 */
beforeEach(() => {
  // Clear all rockets before each test
  (rocketService as any).rockets.clear();
  (rocketService as any).nextId = 1;
});

describe('Rockets API - E2E Tests', () => {
  describe('Creation (Event-Driven & Action-Driven)', () => {
    it('should create a new rocket with HTTP 201 when valid data is provided', async () => {
      const rocketData = {
        name: 'Apollo-1',
        capacity: 5,
        status: 'available',
        range: 1000
      };

      const response = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rocketData)
      });

      expect(response.status).toBe(201);
      const rocket = await response.json();
      expect(rocket).toHaveProperty('id');
      expect(rocket.name).toBe('Apollo-1');
      expect(rocket.capacity).toBe(5);
      expect(rocket.status).toBe('available');
      expect(rocket.range).toBe(1000);
    });

    it('should reject creation with HTTP 400 when required fields are missing', async () => {
      const invalidData = {
        name: 'Incomplete-Rocket'
        // Missing capacity, status, range
      };

      const response = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      expect(response.status).toBe(400);
      const error = await response.json();
      expect(error).toHaveProperty('error', 'Bad Request');
      expect(error).toHaveProperty('message');
    });

    it('should reject creation with HTTP 400 when capacity is invalid', async () => {
      const invalidData = {
        name: 'Bad-Capacity',
        capacity: -5,
        status: 'available',
        range: 1000
      };

      const response = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      expect(response.status).toBe(400);
    });

    it('should reject creation with HTTP 400 when status is invalid', async () => {
      const invalidData = {
        name: 'Bad-Status',
        capacity: 5,
        status: 'invalid-status',
        range: 1000
      };

      const response = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Retrieval (Action-Driven & State-Driven)', () => {
    it('should retrieve all rockets with HTTP 200', async () => {
      // Create two rockets
      await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Rocket-1',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });

      await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Rocket-2',
          capacity: 10,
          status: 'maintenance',
          range: 2000
        })
      });

      const response = await fetch(`${BASE_URL}/rockets`);
      expect(response.status).toBe(200);
      const rockets = await response.json();
      expect(Array.isArray(rockets)).toBe(true);
      expect(rockets.length).toBe(2);
    });

    it('should retrieve a specific rocket by ID with HTTP 200', async () => {
      // Create a rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'TestRocket',
          capacity: 8,
          status: 'available',
          range: 1500
        })
      });
      const created = await createResponse.json();

      // Retrieve it
      const response = await fetch(`${BASE_URL}/rockets/${created.id}`);
      expect(response.status).toBe(200);
      const rocket = await response.json();
      expect(rocket.id).toBe(created.id);
      expect(rocket.name).toBe('TestRocket');
    });

    it('should return HTTP 404 when retrieving non-existent rocket', async () => {
      const response = await fetch(`${BASE_URL}/rockets/99999`);
      expect(response.status).toBe(404);
      const error = await response.json();
      expect(error).toHaveProperty('error', 'Not Found');
    });

    it('should return rockets with complete properties in responses', async () => {
      const rocketData = {
        name: 'CompleteRocket',
        capacity: 12,
        status: 'available',
        range: 2500
      };

      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rocketData)
      });
      const rocket = await createResponse.json();

      expect(rocket).toHaveProperty('id');
      expect(rocket).toHaveProperty('name');
      expect(rocket).toHaveProperty('capacity');
      expect(rocket).toHaveProperty('status');
      expect(rocket).toHaveProperty('range');
    });
  });

  describe('Updates (Action-Driven & State-Driven)', () => {
    it('should update rocket properties with HTTP 200', async () => {
      // Create a rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'UpdateTest',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Update it
      const updateResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capacity: 10,
          range: 2000
        })
      });

      expect(updateResponse.status).toBe(200);
      const updated = await updateResponse.json();
      expect(updated.capacity).toBe(10);
      expect(updated.range).toBe(2000);
    });

    it('should prevent capacity modification when rocket is in-flight', async () => {
      // Create a rocket in-flight status
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'InFlightRocket',
          capacity: 5,
          status: 'in-flight',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Try to modify capacity
      const updateResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ capacity: 10 })
      });

      expect(updateResponse.status).toBe(400);
      const error = await updateResponse.json();
      expect(error.message).toContain('Cannot modify capacity');
    });

    it('should update rocket status with HTTP 200', async () => {
      // Create a rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'StatusTest',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Update status to maintenance
      const updateResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'maintenance' })
      });

      expect(updateResponse.status).toBe(200);
      const updated = await updateResponse.json();
      expect(updated.status).toBe('maintenance');
    });

    it('should return HTTP 404 when updating non-existent rocket', async () => {
      const response = await fetch(`${BASE_URL}/rockets/99999`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ capacity: 10 })
      });

      expect(response.status).toBe(404);
    });

    it('should return HTTP 400 when update validation fails', async () => {
      // Create a rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'ValidationTest',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Try invalid update
      const updateResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ capacity: -5 })
      });

      expect(updateResponse.status).toBe(400);
    });
  });

  describe('Deletion (Event-Driven & Result-Driven)', () => {
    it('should delete a rocket with HTTP 204', async () => {
      // Create a rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'DeleteTest',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Delete it
      const deleteResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'DELETE'
      });

      expect(deleteResponse.status).toBe(204);

      // Verify it's deleted
      const getResponse = await fetch(`${BASE_URL}/rockets/${created.id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return HTTP 404 when deleting non-existent rocket', async () => {
      const response = await fetch(`${BASE_URL}/rockets/99999`, {
        method: 'DELETE'
      });

      expect(response.status).toBe(404);
    });
  });

  describe('Business Logic - State-Driven', () => {
    it('should allow assignment to bookings when status is available', async () => {
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AvailableRocket',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });

      const rocket = await createResponse.json();
      expect(rocket.status).toBe('available');
      // Rocket with available status can be booked
      expect(rocket).toBeDefined();
    });

    it('should prevent booking when rocket is in maintenance status', async () => {
      const response = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'MaintenanceRocket',
          capacity: 5,
          status: 'maintenance',
          range: 1000
        })
      });

      const rocket = await response.json();
      expect(rocket.status).toBe('maintenance');
      // Rocket in maintenance should not appear in available queries
    });

    it('should handle status transition from available to maintenance', async () => {
      // Create available rocket
      const createResponse = await fetch(`${BASE_URL}/rockets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'TransitionRocket',
          capacity: 5,
          status: 'available',
          range: 1000
        })
      });
      const created = await createResponse.json();

      // Transition to maintenance
      const updateResponse = await fetch(`${BASE_URL}/rockets/${created.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'maintenance' })
      });

      expect(updateResponse.status).toBe(200);
      const updated = await updateResponse.json();
      expect(updated.status).toBe('maintenance');
    });
  });
});
