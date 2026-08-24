import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/routes.ts';

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}...`)
})

