"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHealthRoutes = registerHealthRoutes;
const service_1 = require("./service");
function textReply(reply, content, status = 200) {
    return reply.status(status).type('text/plain; charset=utf-8').send(content);
}
async function registerHealthRoutes(app) {
    app.get('/health/alive', async (_request, reply) => {
        return textReply(reply, 'OK');
    });
    app.get('/health/ready', async (_request, reply) => {
        if (service_1.healthService.connected) {
            return textReply(reply, 'OK');
        }
        const error = service_1.healthService.error || 'Database connection failed';
        return textReply(reply, `Service is not ready: ${error}`, 500);
    });
}
