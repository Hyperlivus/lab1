import request from 'supertest';
import fastify from 'fastify';
import { registerHealthRoutes, healthService } from '../../src/health';

describe('Health Routes', () => {
  let app: any;

  beforeEach(async () => {
    app = fastify();
    healthService.setConnected(false);
    await registerHealthRoutes(app);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /health/alive', () => {
    it('should return 200 OK', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health/alive'
      });

      expect(response.statusCode).toBe(200);
      expect(response.payload).toBe('OK');
    });
  });

  describe('GET /health/ready', () => {
    it('should return 200 when connected', async () => {
      healthService.setConnected(true);

      const response = await app.inject({
        method: 'GET',
        url: '/health/ready'
      });

      expect(response.statusCode).toBe(200);
      expect(response.payload).toBe('OK');
    });

    it('should return 500 when not connected', async () => {
      healthService.setConnected(false, 'Database error');

      const response = await app.inject({
        method: 'GET',
        url: '/health/ready'
      });

      expect(response.statusCode).toBe(500);
      expect(response.payload).toBe('Service is not ready: Database error');
    });
  });
});