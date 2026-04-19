import { validateNotePayload } from '../../src/notest/validation';

describe('Note Validation', () => {
  describe('validateNotePayload', () => {
    it('should validate valid note payload', () => {
      const validPayload = {
        title: 'Test Note',
        content: 'This is a test note content'
      };

      const result = validateNotePayload(validPayload);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (result.success) {
        expect(result.data!.title).toBe('Test Note');
        expect(result.data!.content).toBe('This is a test note content');
      }
    });

    it('should accept empty title', () => {
      const validPayload = {
        title: '',
        content: 'Valid content'
      };

      const result = validateNotePayload(validPayload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data!.title).toBe('');
        expect(result.data!.content).toBe('Valid content');
      }
    });

    it('should reject title too long', () => {
      const invalidPayload = {
        title: 'a'.repeat(65), // 65 characters, max is 64
        content: 'Valid content'
      };

      const result = validateNotePayload(invalidPayload);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('title Too big: expected string to have <=64 characters');
      }
    });

    it('should accept empty content', () => {
      const validPayload = {
        title: 'Valid Title',
        content: ''
      };

      const result = validateNotePayload(validPayload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data!.title).toBe('Valid Title');
        expect(result.data!.content).toBe('');
      }
    });

    it('should reject content too long', () => {
      const invalidPayload = {
        title: 'Valid Title',
        content: 'a'.repeat(10001) // 10001 characters, max is 10000
      };

      const result = validateNotePayload(invalidPayload);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('content Too big: expected string to have <=10000 characters');
      }
    });

    it('should reject missing title', () => {
      const invalidPayload = {
        content: 'Valid content'
      } as any;

      const result = validateNotePayload(invalidPayload);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('title Invalid input: expected string, received undefined');
      }
    });

    it('should reject missing content', () => {
      const invalidPayload = {
        title: 'Valid Title'
      } as any;

      const result = validateNotePayload(invalidPayload);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain('content Invalid input: expected string, received undefined');
      }
    });
  });
});