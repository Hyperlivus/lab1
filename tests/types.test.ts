import { Note } from '../src/types';

describe('Types', () => {
  describe('Note interface', () => {
    it('should allow creating a valid Note object', () => {
      const note: Note = {
        id: '123',
        title: 'Test Note',
        content: 'Test content',
        created_at: '2024-01-01T00:00:00.000Z'
      };

      expect(note.id).toBe('123');
      expect(note.title).toBe('Test Note');
      expect(note.content).toBe('Test content');
      expect(note.created_at).toBe('2024-01-01T00:00:00.000Z');
    });
  });
});