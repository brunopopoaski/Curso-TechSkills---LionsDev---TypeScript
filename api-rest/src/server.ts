import express from "express";
import dotenv from "dotenv";
import type { IUser } from "./models/models.ts";
import { UserController } from "./controllers/controller.ts";
import logMiddleware from "./middlewares/logger.ts";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(logMiddleware);




let arrayUsers: IUser[] = [{ id: 1, name: "Bruno", email: "bruno@email.com" }];

app.get('/users', (req: express.Request, res: express.Response) => {
    try{
        const listUsersController = new UserController(arrayUsers);
        res.json(listUsersController.allUsers());
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});


app.get('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);
        const listUserController = new UserController(arrayUsers);
        const user = listUserController.userById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

app.post('/users', (req: express.Request, res: express.Response) => {
    try {
        const newUser: IUser = req.body;
        const userController = new UserController(arrayUsers);
        res.status(201).json(userController.createUser(newUser));
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);
        const userController = new UserController(arrayUsers);
        const deleted = userController.deleteUser(id);
        if (deleted) {
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

app.put('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);
        const updatedUser = req.body;
        const userController = new UserController(arrayUsers);
        const user = userController.updateUser(id, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});


app.listen(PORT, ()=> {
    console.log(`Server rodando na porta ${PORT}...`)
})