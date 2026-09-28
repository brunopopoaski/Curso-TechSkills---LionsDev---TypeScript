import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import express, { type NextFunction, type Request, type Response } from 'express';

type RequestContext = {
  requestId: string;
};

const storage = new AsyncLocalStorage<RequestContext>();
const logBuffer: string[] = [];

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

function logInfo(message: string, meta: Record<string, unknown> = {}): void {
  const context = storage.getStore();
  const requestId = context?.requestId ?? 'no-context';
  const line = JSON.stringify({ requestId, message, ...meta });
  logBuffer.push(line);
  console.log(line);
}

async function buscarPedido(id: string): Promise<{ id: string; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return { id, total: 124.90 };
}

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  const incomingRequestId = req.get('x-request-id') ?? randomUUID();
  req.requestId = incomingRequestId;
  res.setHeader('x-request-id', incomingRequestId);

  storage.run({ requestId: incomingRequestId }, () => {
    logInfo('requisição recebida', { method: req.method, route: req.originalUrl });
    next();
  });
});

app.get('/orders/:id', async (req: Request, res: Response) => {
  const rawOrderId = req.params.id;
  const orderId = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId;
  logInfo('consultando pedido', { orderId });

  try {
    const pedido = await buscarPedido(orderId);
    logInfo('pedido encontrado', { orderId, pedido });
    res.status(200).json(pedido);
  } catch (error) {
    logInfo('erro ao consultar pedido', { orderId, error: error instanceof Error ? error.message : String(error) });
    res.status(500).json({ message: 'erro ao consultar pedido' });
  }
});

async function triggerConcurrentRequests(): Promise<void> {
  const requestIds = ['client-1', 'client-2', 'client-3'];

  const responses = await Promise.all(
    requestIds.map(async (requestId, index) => {
      const response = await fetch(`http://localhost:3002/orders/${index + 1}`, {
        headers: { 'x-request-id': requestId },
      });

      return {
        requestId,
        status: response.status,
        body: await response.json(),
      };
    })
  );

  console.log('\n--- respostas das requisições concorrentes ---');
  console.log(JSON.stringify(responses, null, 2));

  const selectedId = 'client-2';
  const filtered = logBuffer.filter((entry) => entry.includes(selectedId));
  console.log(`\n--- log filtrado por ${selectedId} ---`);
  console.log(filtered.join('\n'));
}

app.listen(3002, async () => {
  console.log('servidor do exercício 9 em http://localhost:3002');
  await triggerConcurrentRequests();
  process.exit(0);
});
