import type { IUser } from "../models/models.ts";

export class UserService {
    private users: IUser[];

    constructor(users: IUser[]) {
        this.users = users;
    }

    allUsers(): IUser[] {
        if (!this.users) {
            throw new Error('Erro ao buscar usuários');
        }
        return this.users;
    }

    userById(id: number): IUser | undefined {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    createUser(newUser: IUser): IUser {
        this.users.push(newUser);
        return newUser;
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }

    updateUser(id: number, updatedUser: Partial<IUser>): IUser | undefined {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            return undefined;
        }
        Object.assign(user, updatedUser);
        return user;
    }
}