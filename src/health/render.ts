export const render = {
  htmlPage(title: string, body: string): string {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`;
  },

  endpointsList(): string {
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

  errorMessage(message: string): string {
    return `<div style="color: #a00;"><h2>Помилка</h2><p>${message}</p></div>`;
  },
};
