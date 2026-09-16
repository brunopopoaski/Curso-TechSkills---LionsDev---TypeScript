"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrder = processOrder;
const logger_1 = require("./logger");
const orders = {
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
async function findOrder(orderId) {
    const order = orders[orderId];
    if (!order) {
        throw new Error(`Order ${orderId} not found`);
    }
    return order;
}
async function processOrder(orderId) {
    logger_1.logger.info('processing started', { orderId });
    try {
        const order = await findOrder(orderId);
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        const { customerCpf, ...safeOrder } = order;
        logger_1.logger.info('processing finished', {
            orderId,
            total,
            order: safeOrder,
        });
        return total;
    }
    catch (error) {
        logger_1.logger.error('processing failed', {
            orderId,
            err: (0, logger_1.serializeError)(error),
        });
        throw error;
    }
    finally {
        logger_1.logger.info('processing lifecycle ended', { orderId });
    }
}
