"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesRepository = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const STORAGE_DIR = node_path_1.default.resolve(process.cwd(), 'data');
const STORAGE_FILE = node_path_1.default.join(STORAGE_DIR, 'notes.json');
class NotesRepository {
    constructor() {
        this.notes = [];
        this.connected = false;
    }
    async connect() {
        try {
            await promises_1.default.mkdir(STORAGE_DIR, { recursive: true });
            const raw = await promises_1.default.readFile(STORAGE_FILE, 'utf8').catch(() => '[]');
            this.notes = JSON.parse(raw);
            if (!Array.isArray(this.notes)) {
                this.notes = [];
            }
            this.connected = true;
        }
        catch (error) {
            this.connected = false;
            throw error;
        }
    }
    async getAll() {
        return this.notes;
    }
    async findById(id) {
        return this.notes.find((note) => note.id === id);
    }
    async create(title, content) {
        const note = {
            id: crypto.randomUUID(),
            title,
            content,
            created_at: new Date().toISOString(),
        };
        this.notes.push(note);
        await this.persist();
        return note;
    }
    async persist() {
        await promises_1.default.writeFile(STORAGE_FILE, JSON.stringify(this.notes, null, 2), 'utf8');
    }
}
exports.NotesRepository = NotesRepository;
