import { render } from '../../src/notest/render';
import { Note } from '../../src/types';

describe('Notes Render', () => {
  describe('notesList', () => {
    it('should render empty notes list', () => {
      const result = render.notesList([]);

      expect(result).toContain('<p>Немає нотаток.</p>');
      expect(result).not.toContain('<table');
    });

    it('should render notes list with items', () => {
      const notes = [
        { id: '1', title: 'First Note' },
        { id: '2', title: 'Second Note' }
      ];

      const result = render.notesList(notes);

      expect(result).toContain('<table');
      expect(result).toContain('<thead');
      expect(result).toContain('<tbody');
      expect(result).toContain('First Note');
      expect(result).toContain('Second Note');
      expect(result).toContain('1');
      expect(result).toContain('2');
    });
  });

  describe('noteDetail', () => {
    it('should render note detail', () => {
      const note: Note = {
        id: '123',
        title: 'Test Note',
        content: 'Test content',
        created_at: '2024-01-01T10:00:00.000Z'
      };

      const result = render.noteDetail(note);

      expect(result).toContain('<table');
      expect(result).toContain('123');
      expect(result).toContain('Test Note');
      expect(result).toContain('Test content');
      expect(result).toContain('2024-01-01T10:00:00.000Z');
    });
  });

  describe('errorMessage', () => {
    it('should render error message', () => {
      const result = render.errorMessage('Something went wrong');

      expect(result).toContain('<div style="color: #a00;">');
      expect(result).toContain('<h2>Помилка</h2>');
      expect(result).toContain('<p>Something went wrong</p>');
    });
  });
});