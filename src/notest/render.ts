import { Note } from '../types';

export const render = {
  notesList(notes: Array<{ id: string; title: string }>): string {
    if (notes.length === 0) {
      return '<p>Немає нотаток.</p>';
    }

    const rows = notes
      .map((note) => `<tr><td>${note.id}</td><td>${note.title}</td></tr>`)
      .join('');

    return `<table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>ID</th><th>Title</th></tr></thead><tbody>${rows}</tbody></table>`;
  },

  noteDetail(note: Note): string {
    return `<table border="1" cellpadding="6" cellspacing="0">
      <tr><th>ID</th><td>${note.id}</td></tr>
      <tr><th>Title</th><td>${note.title}</td></tr>
      <tr><th>Created At</th><td>${note.created_at}</td></tr>
      <tr><th>Content</th><td>${note.content}</td></tr>
    </table>`;
  },

  errorMessage(message: string): string {
    return `<div style="color: #a00;"><h2>Помилка</h2><p>${message}</p></div>`;
  },
};
