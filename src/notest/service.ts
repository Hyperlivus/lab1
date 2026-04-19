import dal from './dal';
import { validateNotePayload } from './validation';
import { Note } from '../types';

export type ValidationError = {
  type: 'validation';
  errors: string[];
};

export function createValidationError(errors: string[]): ValidationError {
  return { type: 'validation', errors };
}

export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    (error as any).type === 'validation' &&
    Array.isArray((error as any).errors)
  );
}

const service = {
  async listNotes(): Promise<Pick<Note, 'id' | 'title'>[]> {
    const notes = await dal.getAll();
    return notes.map((note) => ({ id: note.id, title: note.title }));
  },

  async getNoteById(id: string): Promise<Note | undefined> {
    return dal.findById(id);
  },

  async createNote(payload: unknown): Promise<Note> {
    const validation = validateNotePayload(payload);
    if (!validation.success || !validation.data) {
      throw createValidationError(validation.errors);
    }
    return dal.create(validation.data.title, validation.data.content);
  },
};

export default service;