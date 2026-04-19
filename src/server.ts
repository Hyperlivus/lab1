import fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'node:path';
import { registerNotesRoutes } from './notest/router';
import { registerHealthRoutes, healthService } from './health';
import { render } from './health/render';
import { db } from './db';


const CONFIG_PATH = '/etc/mywebapp/config.env';
const LOCAL_CONFIG_PATH = path.join(process.cwd(), 'etc', 'mywebapp', 'config.env');

dotenv.config({ path: CONFIG_PATH });
if (!process.env.PORT) {
  dotenv.config({ path: LOCAL_CONFIG_PATH });
}

const port = Number(process.env.PORT || '8080');

async function run(): Promise<void> {

  try {
    await db.connect();
    healthService.setConnected(true);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    healthService.setConnected(false, errorMsg);
    console.error('Database connection failed:', errorMsg);
    process.exit(1);
  }

  const app = fastify({ logger: true });

  app.get('/', async (request, reply) => {
    const accept = request.headers.accept;
    if (
        typeof accept !== 'string' 
        || !accept.includes('text/html')
    ) {
      return reply.status(406).type('text/plain; charset=utf-8').send('Only text/html is supported at this endpoint');
    }

    return reply.type('text/html; charset=utf-8').send(render.htmlPage('Notes Service', render.endpointsList()));
  });

  await registerHealthRoutes(app);
  await registerNotesRoutes(app);

  try {
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`Server listening on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
