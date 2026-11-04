import express from 'express';
const router = express.Router();

router.get('/somar', (req, res) => {
    const { a, b } = req.body;
    const resultado = a + b;
    res.status(200).json({ resultado });
});

export default router;