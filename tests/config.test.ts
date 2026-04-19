import { dbConfig, appConfig } from '../src/config';

describe('Config', () => {
  describe('dbConfig', () => {
    it('should have default values', () => {
      expect(dbConfig.host).toBe('localhost');
      expect(dbConfig.port).toBe(5432);
      expect(dbConfig.database).toBe('notes_db');
      expect(dbConfig.user).toBe('postgres');
      expect(dbConfig.password).toBe('postgres');
    });

    it('should have all required properties', () => {
      expect(dbConfig).toHaveProperty('host');
      expect(dbConfig).toHaveProperty('port');
      expect(dbConfig).toHaveProperty('database');
      expect(dbConfig).toHaveProperty('user');
      expect(dbConfig).toHaveProperty('password');
    });
  });

  describe('appConfig', () => {
    it('should have default port', () => {
      expect(appConfig.port).toBe(8080);
    });
  });
});