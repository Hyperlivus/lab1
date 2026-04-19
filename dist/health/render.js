"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
exports.render = {
    htmlPage(title, body) {
        return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`;
    },
    endpointsList() {
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
    },
    errorMessage(message) {
        return `<div style="color: #a00;"><h2>Помилка</h2><p>${message}</p></div>`;
    },
};
