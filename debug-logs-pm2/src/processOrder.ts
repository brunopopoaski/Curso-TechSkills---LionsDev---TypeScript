import { logger, serializeError } from './logger';

type OrderItem = { sku: string; price: number };
type Order = {
  id: string;
  customerCpf: string;
  items: OrderItem[];
};

const orders: Record<string, Order> = {
  'valid-123': {
    id: 'valid-123',
    customerCpf: '123.456.789-00',
    items: [
      { sku: 'A', price: 10 },
      { sku: 'B', price: 20 },
      { sku: 'C', price: 30 },
    ],
  },
};

async function findOrder(orderId: string): Promise<Order> {
  const order = orders[orderId];

  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  return order;
}

export async function processOrder(orderId: string): Promise<number> {
  logger.info('processing started', { orderId });

  try {
    const order = await findOrder(orderId);
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    const { customerCpf, ...safeOrder } = order;

    logger.info('processing finished', {
      orderId,
      total,
      order: safeOrder,
    });

    return total;
  } catch (error) {
    logger.error('processing failed', {
      orderId,
      err: serializeError(error),
    });

    throw error;
  } finally {
    logger.info('processing lifecycle ended', { orderId });
  }
}
