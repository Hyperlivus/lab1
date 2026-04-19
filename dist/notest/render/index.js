"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHtmlPage = renderHtmlPage;
exports.renderNotesList = renderNotesList;
exports.renderNoteDetail = renderNoteDetail;
exports.renderEndpointsList = renderEndpointsList;
function renderHtmlPage(title, body) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`;
}
function renderNotesList(notes) {
    if (notes.length === 0) {
        return '<p>Немає нотаток.</p>';
    }
    const rows = notes.map((note) => `<tr><td>${note.id}</td><td>${note.title}</td></tr>`).join('');
    return `<table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>ID</th><th>Title</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function renderNoteDetail(note) {
    return `<table border="1" cellpadding="6" cellspacing="0">
    <tr><th>ID</th><td>${note.id}</td></tr>
    <tr><th>Title</th><td>${note.title}</td></tr>
    <tr><th>Created At</th><td>${note.created_at}</td></tr>
    <tr><th>Content</th><td>${note.content}</td></tr>
  </table>`;
}
function renderEndpointsList() {
    return `
    <p>Список ендпоінтів бізнес-логіки:</p>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Метод</th><th>Шлях</th><th>Опис</th></tr></thead>
      <tbody>
        <tr><td>GET</td><td>/notes</td><td>Список нотаток (id, title)</td></tr>
        <tr><td>POST</td><td>/notes</td><td>Створити нотатку</td></tr>
        <tr><td>GET</td><td>/notes/&lt;id&gt;</td><td>Деталі нотатки</td></tr>
      </tbody>
    </table>
  `;
}
