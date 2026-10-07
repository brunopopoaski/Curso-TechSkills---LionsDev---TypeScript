import express from 'express';
import { EnvConfig } from './env.config.ts';

const app = express();

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    port: EnvConfig.PORT,
    dbHost: EnvConfig.DB_HOST,
  });
});

const server = app.listen(EnvConfig.PORT, () => {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : EnvConfig.PORT;

  console.log('servidor no ar na porta', port);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`porta ${EnvConfig.PORT} já está em uso`);
    process.exit(1);
  }

  console.error('erro ao iniciar o servidor:', error.message);
  process.exit(1);
});