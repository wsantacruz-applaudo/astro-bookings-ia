import { Router, Request, Response } from 'express';
import { rocketService } from '../services/rocket-service.js';
import { CreateRocketInput, UpdateRocketInput } from '../types/rocket.js';
import { error, info, warn } from '../utils/logger.js';

const router = Router();

/**
 * GET /rockets - Returns a list of all rockets
 */
router.get('/', (req: Request, res: Response) => {
  try {
    info('rockets:get-all', 'Request received', {
      method: req.method,
      path: req.path
    });

    const rockets = rocketService.getAllRockets();

    info('rockets:get-all', 'Request succeeded', {
      count: rockets.length,
      statusCode: 200
    });

    res.status(200).json(rockets);
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('Unknown error');
    error('rockets:get-all', 'Request failed', {
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to list rockets'
    });
  }
});

/**
 * GET /rockets/:id - Returns details of a specific rocket by its ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    info('rockets:get-by-id', 'Request received', {
      method: req.method,
      path: req.path,
      id
    });

    const rocket = rocketService.getRocketById(id);

    if (!rocket) {
      warn('rockets:get-by-id', 'Rocket not found', {
        id,
        statusCode: 404
      });
      res.status(404).json({
        error: 'Not Found',
        message: `Rocket with id ${id} not found`
      });
      return;
    }

    info('rockets:get-by-id', 'Request succeeded', {
      id,
      statusCode: 200
    });
    res.status(200).json(rocket);
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('Unknown error');
    error('rockets:get-by-id', 'Request failed', {
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve rocket'
    });
  }
});

/**
 * POST /rockets - Creates a new rocket entry
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const data: CreateRocketInput = req.body;

    info('rockets:create', 'Request received', {
      method: req.method,
      path: req.path,
      name: data.name,
      status: data.status
    });

    const result = rocketService.createRocket(data);

    if ('error' in result) {
      warn('rockets:create', 'Validation failed', {
        statusCode: 400,
        reason: result.error,
        payload: data
      });
      res.status(400).json({
        error: 'Bad Request',
        message: result.error
      });
      return;
    }

    info('rockets:create', 'Request succeeded', {
      id: result.rocket.id,
      statusCode: 201
    });
    res.status(201).json(result.rocket);
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('Unknown error');
    error('rockets:create', 'Request failed', {
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create rocket'
    });
  }
});

/**
 * PUT /rockets/:id - Updates an existing rocket entry by its ID
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateRocketInput = req.body;

    info('rockets:update', 'Request received', {
      method: req.method,
      path: req.path,
      id,
      payload: data
    });

    const result = rocketService.updateRocket(id, data);

    if ('error' in result) {
      const statusCode = result.error.includes('not found') ? 404 : 400;
      warn('rockets:update', 'Request rejected', {
        id,
        statusCode,
        reason: result.error
      });
      res.status(statusCode).json({
        error: statusCode === 404 ? 'Not Found' : 'Bad Request',
        message: result.error
      });
      return;
    }

    info('rockets:update', 'Request succeeded', {
      id,
      statusCode: 200
    });
    res.status(200).json(result.rocket);
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('Unknown error');
    error('rockets:update', 'Request failed', {
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update rocket'
    });
  }
});

/**
 * DELETE /rockets/:id - Deletes a rocket entry by its ID
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    info('rockets:delete', 'Request received', {
      method: req.method,
      path: req.path,
      id
    });

    const result = rocketService.deleteRocket(id);

    if ('error' in result) {
      warn('rockets:delete', 'Rocket not found', {
        id,
        statusCode: 404,
        reason: result.error
      });
      res.status(404).json({
        error: 'Not Found',
        message: result.error
      });
      return;
    }

    info('rockets:delete', 'Request succeeded', {
      id,
      statusCode: 204
    });
    res.status(204).send();
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('Unknown error');
    error('rockets:delete', 'Request failed', {
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete rocket'
    });
  }
});

export const rocketsRouter = router;
