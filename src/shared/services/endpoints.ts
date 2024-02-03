const ENDPOINTS = {
  mission: '/api/missions',
  pilot: '/api/pilots',
  hospital: '/api/hospitals',
  airport: '/api/aerodromes',
  plane: '/api/planes',
} as const;

export type Entity = keyof typeof ENDPOINTS;

export default ENDPOINTS;
