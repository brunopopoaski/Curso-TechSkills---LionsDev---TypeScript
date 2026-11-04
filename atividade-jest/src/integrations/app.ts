import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(userRoutes);

app.get('/ping', (_request, response) => {
  response.json({ status: 'ok' });
});

export default app;