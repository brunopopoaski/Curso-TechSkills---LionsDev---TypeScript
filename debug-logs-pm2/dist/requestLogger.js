"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const node_crypto_1 = __importDefault(require("node:crypto"));
const logger_1 = require("./logger");
function requestLogger(req, res, next) {
    const requestId = node_crypto_1.default.randomUUID();
    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);
    const start = process.hrtime.bigint();
    res.on('finish', () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
        logger_1.logger.info('request completed', {
            requestId,
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Number(durationMs.toFixed(3)),
        });
    });
    next();
}
