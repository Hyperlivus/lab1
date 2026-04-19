import { FastifyInstance, FastifyRequest } from 'fastify';
import { isValidationError } from './service';
import { render } from './render';
import { htmlReply, jsonReply } from './response';
import service from './service';

function acceptsHtml(request: FastifyRequest): boolean {
  const accept = request.headers.accept;
  return typeof accept === 'string' && accept.includes('text/html');
}

export async function registerNotesRoutes(
  app: FastifyInstance,
): Promise<void> {

  app.get('/notes', async (request, reply) => {
    const notes = await service.listNotes();

    if (acceptsHtml(request)) {
      return htmlReply(reply, render.notesList(notes));
    }

    return jsonReply(reply, { notes });
  });

  app.post('/notes', async (request, reply) => {
    try {
      const note = await service.createNote(request.body);

      if (acceptsHtml(request)) {
        return htmlReply(reply, render.noteDetail(note), 201);
      }

      return jsonReply(reply, note, 201);
    } catch (error) {
      if (isValidationError(error)) {
        if (acceptsHtml(request)) {
          return htmlReply(reply, `<p>Помилка валідації: ${error.errors.join(', ')}</p>`, 400);
        }
        return jsonReply(reply, { errors: error.errors }, 400);
      }
      return jsonReply(reply, { error: 'Internal server error' }, 500);
    }
  });

  app.get('/notes/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const note = await service.getNoteById(id);

    if (!note) {
      if (acceptsHtml(request)) {
        return htmlReply(reply, `<p>Нотатку з id=${id} не знайдено.</p>`, 404);
      }
      return jsonReply(reply, { error: 'Note not found' }, 404);
    }

    if (acceptsHtml(request)) {
      return htmlReply(reply, render.noteDetail(note));
    }

    return jsonReply(reply, note);
  });
}
