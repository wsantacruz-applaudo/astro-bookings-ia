import { Rocket, RocketStatus, CreateRocketInput, UpdateRocketInput } from '../types/rocket';
import { debug, error, info, warn } from '../utils/logger.js';

class RocketService {
  private rockets: Map<string, Rocket> = new Map();
  private nextIdCounter: number = 1;

  private readonly validStatuses: RocketStatus[] = ['available', 'in-flight', 'maintenance'];

  /**
   * Validate rocket data
   */
  private validateRocketData(data: Partial<CreateRocketInput>, isUpdate: boolean = false): string | null {
    debug('rocket-service:validate', 'Validating rocket data', {
      isUpdate,
      fields: Object.keys(data)
    });

    if (!isUpdate) {
      // For creation, all fields are required
      if (!data.name || typeof data.name !== 'string') {
        return 'Name is required and must be a string';
      }
      if (data.capacity === undefined || typeof data.capacity !== 'number' || data.capacity <= 0) {
        return 'Capacity is required and must be a positive number';
      }
      if (!data.status || !this.validStatuses.includes(data.status)) {
        return `Status is required and must be one of: ${this.validStatuses.join(', ')}`;
      }
      if (data.range === undefined || typeof data.range !== 'number' || data.range <= 0) {
        return 'Range is required and must be a positive number';
      }
    } else {
      // For updates, validate only provided fields
      if (data.name !== undefined && typeof data.name !== 'string') {
        return 'Name must be a string';
      }
      if (data.capacity !== undefined && (typeof data.capacity !== 'number' || data.capacity <= 0)) {
        return 'Capacity must be a positive number';
      }
      if (data.status !== undefined && !this.validStatuses.includes(data.status)) {
        return `Status must be one of: ${this.validStatuses.join(', ')}`;
      }
      if (data.range !== undefined && (typeof data.range !== 'number' || data.range <= 0)) {
        return 'Range must be a positive number';
      }
    }
    return null;
  }

  /**
   * Get all rockets
   */
  getAllRockets(): Rocket[] {
    const rockets = Array.from(this.rockets.values());
    debug('rocket-service:get-all', 'Returning all rockets', {
      count: rockets.length
    });
    return rockets;
  }

  /**
   * Get rocket by ID
   */
  getRocketById(id: string): Rocket | null {
    const rocket = this.rockets.get(id) || null;
    debug('rocket-service:get-by-id', 'Lookup completed', {
      id,
      found: Boolean(rocket)
    });
    return rocket;
  }

  /**
   * Create a new rocket
   */
  createRocket(data: CreateRocketInput): { rocket: Rocket; error?: undefined } | { error: string; rocket?: undefined } {
    info('rocket-service:create', 'Create rocket requested', {
      name: data.name,
      status: data.status
    });

    const validationError = this.validateRocketData(data);
    if (validationError) {
      warn('rocket-service:create', 'Create rocket validation failed', {
        reason: validationError,
        payload: data
      });
      return { error: validationError };
    }

    const id = String(this.nextIdCounter++);
    const rocket: Rocket = {
      id,
      name: data.name,
      capacity: data.capacity,
      status: data.status,
      range: data.range
    };

    this.rockets.set(id, rocket);

    info('rocket-service:create', 'Rocket created', {
      id,
      status: rocket.status
    });

    return { rocket };
  }

  /**
   * Update a rocket
   */
  updateRocket(
    id: string,
    data: UpdateRocketInput
  ): { rocket: Rocket; error?: undefined } | { error: string; rocket?: undefined } {
    info('rocket-service:update', 'Update rocket requested', {
      id,
      fields: Object.keys(data)
    });

    const rocket = this.rockets.get(id);
    if (!rocket) {
      warn('rocket-service:update', 'Rocket not found', { id });
      return { error: `Rocket with id ${id} not found` };
    }

    // Prevent capacity modification if in-flight
    if (data.capacity !== undefined && rocket.status === 'in-flight') {
      warn('rocket-service:update', 'Rejected in-flight capacity update', {
        id,
        currentStatus: rocket.status,
        requestedCapacity: data.capacity
      });
      return { error: 'Cannot modify capacity of a rocket that is in-flight' };
    }

    const validationError = this.validateRocketData(data, true);
    if (validationError) {
      warn('rocket-service:update', 'Update rocket validation failed', {
        id,
        reason: validationError,
        payload: data
      });
      return { error: validationError };
    }

    const updatedRocket: Rocket = {
      ...rocket,
      ...data
    };

    this.rockets.set(id, updatedRocket);

    if (rocket.status !== updatedRocket.status) {
      info('rocket-service:update', 'Rocket status changed', {
        id,
        previousStatus: rocket.status,
        nextStatus: updatedRocket.status
      });
    }

    info('rocket-service:update', 'Rocket updated', {
      id,
      status: updatedRocket.status
    });

    return { rocket: updatedRocket };
  }

  /**
   * Delete a rocket
   */
  deleteRocket(id: string): { success: boolean; error?: undefined } | { error: string; success?: undefined } {
    info('rocket-service:delete', 'Delete rocket requested', { id });

    if (!this.rockets.has(id)) {
      warn('rocket-service:delete', 'Rocket not found', { id });
      return { error: `Rocket with id ${id} not found` };
    }

    try {
      this.rockets.delete(id);
      info('rocket-service:delete', 'Rocket deleted', { id });
    } catch (caught) {
      const caughtError = caught instanceof Error ? caught : new Error('Unknown error while deleting rocket');
      error('rocket-service:delete', 'Delete rocket failed unexpectedly', {
        id,
        message: caughtError.message,
        stack: caughtError.stack
      });
      return { error: 'Failed to delete rocket due to an internal error' };
    }

    return { success: true };
  }
}

export const rocketService = new RocketService();
