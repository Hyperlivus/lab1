"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const router_1 = require("./notest/router");
const health_1 = require("./health");
const render_1 = require("./health/render");
const db_1 = require("./db");
const CONFIG_PATH = '/etc/mywebapp/config.env';
const LOCAL_CONFIG_PATH = node_path_1.default.join(process.cwd(), 'etc', 'mywebapp', 'config.env');
dotenv_1.default.config({ path: CONFIG_PATH });
if (!process.env.PORT) {
    dotenv_1.default.config({ path: LOCAL_CONFIG_PATH });
}
const port = Number(process.env.PORT || '8080');
async function run() {
    try {
        await db_1.db.connect();
        health_1.healthService.setConnected(true);
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        health_1.healthService.setConnected(false, errorMsg);
        console.error('Database connection failed:', errorMsg);
        process.exit(1);
    }
    const app = (0, fastify_1.default)({ logger: true });
    app.get('/', async (request, reply) => {
        const accept = request.headers.accept;
        if (typeof accept !== 'string'
            || !accept.includes('text/html')) {
            return reply.status(406).type('text/plain; charset=utf-8').send('Only text/html is supported at this endpoint');
        }
        return reply.type('text/html; charset=utf-8').send(render_1.render.htmlPage('Notes Service', render_1.render.endpointsList()));
    });
    await (0, health_1.registerHealthRoutes)(app);
    await (0, router_1.registerNotesRoutes)(app);
    try {
        await app.listen({ port, host: '0.0.0.0' });
        app.log.info(`Server listening on port ${port}`);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
