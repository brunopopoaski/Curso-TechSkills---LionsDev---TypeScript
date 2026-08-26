import type { IUser } from "../models/models.ts";
import { UserService } from "../services/service.ts";

export class UserController {
    private users: IUser[];

    constructor(users: IUser[]) {
        this.users = users;
    }

    allUsers(): IUser[] {
        try{
            const userService = new UserService(this.users);
            return userService.allUsers();
        } catch (error) {
            throw new Error('Erro ao buscar usuários 2');
        }
    }

    userById(id: number): IUser | undefined {
        try {
            const userService = new UserService(this.users);
            const user = userService.userById(id);
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário');
        }
    }

    createUser(newUser: IUser): IUser {
        try {
            const userService = new UserService(this.users);
            return userService.createUser(newUser);
        } catch (error) {
            throw new Error('Erro ao criar usuário');
        }
    }

    deleteUser(id: number): boolean {
        try {
            const userService = new UserService(this.users);
            return userService.deleteUser(id);
        } catch (error) {
            throw new Error('Erro ao deletar usuário');
        }
    }

    updateUser(id: number, updatedUser: Partial<IUser>): IUser | undefined {
        try {
            const userService = new UserService(this.users);
            return userService.updateUser(id, updatedUser);
        } catch (error) {
            throw new Error('Erro ao atualizar usuário');
        }
    }
}
