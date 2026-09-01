import { type ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app.error.ts';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
}

