interface IUser {
    id: number,
    name: string,
    email: string,
    isActive: boolean
}

interface IProduct {
    id: number,
    name: string,
    price: number,
    inStock: boolean,
    categories: string[],
}

enum EUserRole {
    ADMIN = "ADMIN",
}

interface IAdminUser extends IUser {
    role: EUserRole.ADMIN
}

function result(user: IUser, product: IProduct, adminUser: IAdminUser): string {
    return `User: ${user.name}, Email: ${user.email}, Active: ${user.isActive}, Product: ${product.name}, Price: ${product.price}, In Stock: ${product.inStock}, Admin Name: ${adminUser.name}, Admin Role: ${adminUser.role}`;
}

console.log(result(
    { id: 1, name: "Eduarda", email: "eduarda@example.com", isActive: true },
    { id: 1, name: "Laptop", price: 1000, inStock: true, categories: ["Electronics", "Computers"] },
    { id: 1, name: "Bruno", email: "bruno@example.com", isActive: true, role: EUserRole.ADMIN }
));