export type RocketStatus = 'available' | 'in-flight' | 'maintenance';

export interface Rocket {
  id: string;
  name: string;
  capacity: number;
  status: RocketStatus;
  range: number;
}

export type CreateRocketInput = Omit<Rocket, 'id'>;
export type UpdateRocketInput = Partial<Omit<Rocket, 'id'>>;
