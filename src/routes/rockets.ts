import { Router, Request, Response } from 'express';
import { rocketService } from '../services/rocket-service.js';
import { CreateRocketInput, UpdateRocketInput } from '../types/rocket.js';

const router = Router();

/**
 * GET /rockets - Returns a list of all rockets
 */
router.get('/', (req: Request, res: Response) => {
  const rockets = rocketService.getAllRockets();
  res.status(200).json(rockets);
});

/**
 * GET /rockets/:id - Returns details of a specific rocket by its ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const rocket = rocketService.getRocketById(id);

  if (!rocket) {
    res.status(404).json({
      error: 'Not Found',
      message: `Rocket with id ${id} not found`
    });
    return;
  }

  res.status(200).json(rocket);
});

/**
 * POST /rockets - Creates a new rocket entry
 */
router.post('/', (req: Request, res: Response) => {
  const data: CreateRocketInput = req.body;

  const result = rocketService.createRocket(data);

  if ('error' in result) {
    res.status(400).json({
      error: 'Bad Request',
      message: result.error
    });
    return;
  }

  res.status(201).json(result.rocket);
});

/**
 * PUT /rockets/:id - Updates an existing rocket entry by its ID
 */
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateRocketInput = req.body;

  const result = rocketService.updateRocket(id, data);

  if ('error' in result) {
    // Check if it's a not found error or validation error
    const statusCode = result.error.includes('not found') ? 404 : 400;
    res.status(statusCode).json({
      error: statusCode === 404 ? 'Not Found' : 'Bad Request',
      message: result.error
    });
    return;
  }

  res.status(200).json(result.rocket);
});

/**
 * DELETE /rockets/:id - Deletes a rocket entry by its ID
 */
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const result = rocketService.deleteRocket(id);

  if ('error' in result) {
    res.status(404).json({
      error: 'Not Found',
      message: result.error
    });
    return;
  }

  res.status(204).send();
});

export const rocketsRouter = router;
