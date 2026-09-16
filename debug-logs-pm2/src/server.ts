import express from 'express';
import { logger } from './logger';
import { requestLogger } from './requestLogger';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get('/lento', async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  res.status(200).json({ ok: true, delayed: true });
});

app.get('/erro', (_req, _res) => {
  throw new Error('erro de rota');
});

app.get('/crash', (_req, res) => {
  setTimeout(() => {
    throw new Error('falha ao processar a fila');
  }, 100);

  res.json({ ok: true });
});

app.get('/crash-fixed', async (_req, res) => {
  try {
    await new Promise((_resolve, reject) => {
      setTimeout(() => reject(new Error('falha ao processar a fila')), 100);
    });
    res.json({ ok: true });
  } catch (error) {
    logger.error('process queue failed', { err: error });
    res.status(500).json({ ok: false, message: (error as Error).message });
  }
});

app.get('/users/:id', (req, res) => {
  res.status(200).json({ id: req.params.id, route: req.originalUrl });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('unhandled app error', { err });
  res.status(500).json({ ok: false, message: err.message });
});

app.listen(port, () => {
  logger.info('server started', { port });
});
