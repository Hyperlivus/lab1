"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = createValidationError;
exports.isValidationError = isValidationError;
const dal_1 = __importDefault(require("./dal"));
const validation_1 = require("./validation");
function createValidationError(errors) {
    return { type: 'validation', errors };
}
function isValidationError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        error.type === 'validation' &&
        Array.isArray(error.errors));
}
const service = {
    async listNotes() {
        const notes = await dal_1.default.getAll();
        return notes.map((note) => ({ id: note.id, title: note.title }));
    },
    async getNoteById(id) {
        return dal_1.default.findById(id);
    },
    async createNote(payload) {
        const validation = (0, validation_1.validateNotePayload)(payload);
        if (!validation.success || !validation.data) {
            throw createValidationError(validation.errors);
        }
        return dal_1.default.create(validation.data.title, validation.data.content);
    },
};
exports.default = service;
