import crypto from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { logger } from './logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const requestId = crypto.randomUUID();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    logger.info('request completed', {
      requestId,
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(3)),
    });
  });

  next();
}

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}
