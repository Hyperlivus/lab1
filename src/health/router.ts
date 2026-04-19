import { FastifyInstance, FastifyReply } from 'fastify';
import { healthService } from './service';

function textReply(reply: FastifyReply, content: string, status = 200): FastifyReply {
  return reply.status(status).type('text/plain; charset=utf-8').send(content);
}

export async function registerHealthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health/alive', async (_request, reply) => {
    return textReply(reply, 'OK');
  });

  app.get('/health/ready', async (_request, reply) => {
    if (healthService.connected) {
      return textReply(reply, 'OK');
    }
    const error = healthService.error || 'Database connection failed';
    return textReply(reply, `Service is not ready: ${error}`, 500);
  });
}
