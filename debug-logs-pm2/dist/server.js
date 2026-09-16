"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const requestLogger_1 = require("./requestLogger");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 3000);
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
});
app.get('/lento', async (_req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    res.status(200).json({ ok: true, delayed: true });
});
app.get('/erro', (_req, _res) => {
    throw new Error('erro de rota');
});
app.get('/crash', (_req, res) => {
    setTimeout(() => {
        throw new Error('falha ao processar a fila');
    }, 100);
    res.json({ ok: true });
});
app.get('/crash-fixed', async (_req, res) => {
    try {
        await new Promise((_resolve, reject) => {
            setTimeout(() => reject(new Error('falha ao processar a fila')), 100);
        });
        res.json({ ok: true });
    }
    catch (error) {
        logger_1.logger.error('process queue failed', { err: error });
        res.status(500).json({ ok: false, message: error.message });
    }
});
app.get('/users/:id', (req, res) => {
    res.status(200).json({ id: req.params.id, route: req.originalUrl });
});
app.use((err, _req, res, _next) => {
    logger_1.logger.error('unhandled app error', { err });
    res.status(500).json({ ok: false, message: err.message });
});
app.listen(port, () => {
    logger_1.logger.info('server started', { port });
});
