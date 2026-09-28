import express, { type ErrorRequestHandler, type Request, type Response } from 'express';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

type User = {
  id: string;
  name: string;
};

const users: Record<string, User> = {
  '1': { id: '1', name: 'Ada' },
};

async function findUser(id: string): Promise<User | null> {
  return users[id] ?? null;
}

const app = express();

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);

    if (!user) {
      throw new AppError('usuário não encontrado', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

app.get('/users/async-fail', async (_req, _res, next) => {
  try {
    await Promise.reject(new Error('falha na camada de dados'));
  } catch (error) {
    next(error);
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: 'rota não encontrada',
    timestamp: new Date().toISOString(),
  });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  console.error('erro inesperado', error instanceof Error ? error.stack : error);

  return res.status(500).json({
    statusCode: 500,
    message: 'erro interno do servidor',
    timestamp: new Date().toISOString(),
  });
};

app.use(errorHandler);

async function makeRequest(path: string): Promise<void> {
  const response = await fetch(`http://localhost:3001${path}`);
  const body = await response.text();
  console.log(`GET ${path} => status ${response.status}`);
  console.log(body);
}

app.listen(3001, async () => {
  console.log('servidor do exercício 8 em http://localhost:3001');
  await makeRequest('/users/1');
  await makeRequest('/users/404');
  await makeRequest('/users/async-fail');
  process.exit(0);
});
