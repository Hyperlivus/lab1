import type { FastifyReply } from 'fastify';
import { render } from '../health/render';

export function htmlReply(reply: FastifyReply, content: string, status = 200): FastifyReply {
  return reply.status(status).type('text/html; charset=utf-8').send(render.htmlPage('Notes Service', content));
}

export function jsonReply(reply: FastifyReply, payload: unknown, status = 200): FastifyReply {
  return reply.status(status).type('application/json; charset=utf-8').send(payload);
}
