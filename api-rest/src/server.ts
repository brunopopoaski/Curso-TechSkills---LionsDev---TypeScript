import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


app.listen(PORT, ()=> {
    console.log(`Server rodando na porta ${PORT}...`)
})

interface IUser{
    id: number;
    name: string;
    email?: string;
}

let arrayUsers: IUser[] = [{ id: 1, name: "Bruno", email: "bruno@email.com" }];

function allUsers(listIUser: IUser[]): IUser[] {
    return listIUser
}

function getById(listIUser: IUser[], id: number): IUser | undefined {
    return listIUser.find(user => user.id === id);
}

function createUser(listIUser: IUser[], newUser: IUser): IUser {
    listIUser.push(newUser);
    return newUser;
}

function deleteUser(listIUser: IUser[], id: number): boolean {
    const index = listIUser.findIndex(user => user.id === id);
    if (index !== -1) {
        listIUser.splice(index, 1);
        return true;
    }
    return false;
}

function updateUser(listIUser: IUser[], id: number, updatedUser: Partial<IUser>): IUser | undefined {
    const user = getById(listIUser, id);
    if (user) {
        Object.assign(user, updatedUser);
        return user;
    }
    return undefined;
}

app.get('/users', (req: express.Request, res: express.Response) => {
    try{
        res.json(allUsers(arrayUsers));
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});


app.get('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = getById(arrayUsers, id);
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
        res.status(201).json(createUser(arrayUsers, newUser));
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = deleteUser(arrayUsers, id);
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
        const id = parseInt(req.params.id);
        const updatedUser = req.body;
        const user = updateUser(arrayUsers, id, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});