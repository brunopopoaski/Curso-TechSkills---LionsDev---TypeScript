import winston from "winston";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const logsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../logs");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logsDirectory, "app.log")
        })
    ]
});

export default function logMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    logger.info({
        method: req.method,
        url: req.url
    });

    next();
}