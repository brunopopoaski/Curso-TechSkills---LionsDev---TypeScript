import express from 'express';
import app from '../app';

const router = app

router.get('/somar', (req, res) => {
    const { a, b } = req.body;
    const resultado = a + b;
    res.status(200).json({ resultado });
});

export default router;