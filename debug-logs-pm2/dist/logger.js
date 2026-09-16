"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeError = exports.safeLogMeta = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const level = process.env.LOG_LEVEL && ['error', 'warn', 'info', 'debug'].includes(process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : 'info';
const normalizeError = (error) => {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }
    return {
        value: String(error),
    };
};
exports.logger = winston_1.default.createLogger({
    level,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const serializedMeta = Object.entries(meta)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === 'err') {
                return `${key}: ${JSON.stringify(normalizeError(value))}`;
            }
            if (value instanceof Error) {
                return `${key}: ${JSON.stringify(normalizeError(value))}`;
            }
            return `${key}: ${JSON.stringify(value)}`;
        })
            .join(' ');
        if (stack) {
            return `${timestamp} ${level.toUpperCase()} ${message} ${serializedMeta ? serializedMeta : ''}\n${stack}`;
        }
        return `${timestamp} ${level.toUpperCase()} ${message}${serializedMeta ? ` ${serializedMeta}` : ''}`;
    })),
    transports: [new winston_1.default.transports.Console()],
});
const safeLogMeta = (meta) => meta;
exports.safeLogMeta = safeLogMeta;
exports.serializeError = normalizeError;
