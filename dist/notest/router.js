"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNotesRoutes = registerNotesRoutes;
const service_1 = require("./service");
const render_1 = require("./render");
const response_1 = require("./response");
const service_2 = __importDefault(require("./service"));
function acceptsHtml(request) {
    const accept = request.headers.accept;
    return typeof accept === 'string' && accept.includes('text/html');
}
async function registerNotesRoutes(app) {
    app.get('/notes', async (request, reply) => {
        const notes = await service_2.default.listNotes();
        if (acceptsHtml(request)) {
            return (0, response_1.htmlReply)(reply, render_1.render.notesList(notes));
        }
        return (0, response_1.jsonReply)(reply, { notes });
    });
    app.post('/notes', async (request, reply) => {
        try {
            const note = await service_2.default.createNote(request.body);
            if (acceptsHtml(request)) {
                return (0, response_1.htmlReply)(reply, render_1.render.noteDetail(note), 201);
            }
            return (0, response_1.jsonReply)(reply, note, 201);
        }
        catch (error) {
            if ((0, service_1.isValidationError)(error)) {
                if (acceptsHtml(request)) {
                    return (0, response_1.htmlReply)(reply, `<p>Помилка валідації: ${error.errors.join(', ')}</p>`, 400);
                }
                return (0, response_1.jsonReply)(reply, { errors: error.errors }, 400);
            }
            return (0, response_1.jsonReply)(reply, { error: 'Internal server error' }, 500);
        }
    });
    app.get('/notes/:id', async (request, reply) => {
        const { id } = request.params;
        const note = await service_2.default.getNoteById(id);
        if (!note) {
            if (acceptsHtml(request)) {
                return (0, response_1.htmlReply)(reply, `<p>Нотатку з id=${id} не знайдено.</p>`, 404);
            }
            return (0, response_1.jsonReply)(reply, { error: 'Note not found' }, 404);
        }
        if (acceptsHtml(request)) {
            return (0, response_1.htmlReply)(reply, render_1.render.noteDetail(note));
        }
        return (0, response_1.jsonReply)(reply, note);
    });
}
