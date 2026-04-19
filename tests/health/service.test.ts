import { healthService } from '../../src/health/service';

describe('Health Service', () => {
  beforeEach(() => {
    // Reset health service state
    healthService.setConnected(false);
  });

  describe('initial state', () => {
    it('should start disconnected', () => {
      expect(healthService.connected).toBe(false);
      expect(healthService.error).toBe(null);
    });
  });

  describe('setConnected', () => {
    it('should set connected to true', () => {
      healthService.setConnected(true);

      expect(healthService.connected).toBe(true);
      expect(healthService.error).toBe(null);
    });

    it('should set connected to false with error', () => {
      const errorMsg = 'Database connection failed';
      healthService.setConnected(false, errorMsg);

      expect(healthService.connected).toBe(false);
      expect(healthService.error).toBe(errorMsg);
    });

    it('should clear error when setting connected', () => {
      healthService.setConnected(false, 'Previous error');
      healthService.setConnected(true);

      expect(healthService.connected).toBe(true);
      expect(healthService.error).toBe(null);
    });
  });

  describe('getStatus', () => {
    it('should return alive and ready when connected', () => {
      healthService.setConnected(true);

      const status = healthService.getStatus();

      expect(status.alive).toBe(true);
      expect(status.ready).toBe(true);
      expect(status.error).toBeUndefined();
    });

    it('should return alive but not ready when disconnected', () => {
      healthService.setConnected(false, 'Connection error');

      const status = healthService.getStatus();

      expect(status.alive).toBe(true);
      expect(status.ready).toBe(false);
      expect(status.error).toBe('Connection error');
    });
  });
});