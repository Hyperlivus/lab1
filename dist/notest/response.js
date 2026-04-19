"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlReply = htmlReply;
exports.jsonReply = jsonReply;
const render_1 = require("../health/render");
function htmlReply(reply, content, status = 200) {
    return reply.status(status).type('text/html; charset=utf-8').send(render_1.render.htmlPage('Notes Service', content));
}
function jsonReply(reply, payload, status = 200) {
    return reply.status(status).type('application/json; charset=utf-8').send(payload);
}
