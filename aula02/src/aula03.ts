interface IUser{
    id: number;
    name: string;
    email?: string;
}


const arrayStrings: string[] = ['apple', 'banana', 'cherry'];
const arrayNumbers: number[] = [1, 2, 3, 4, 5];
const arrayObjects: IUser[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

function getData<T>(items: T[]):T[]{
    return items;
}

console.log(getData<string>(arrayStrings));
console.log(getData<number>(arrayNumbers));
console.log(getData<IUser>(arrayObjects));


function getById<T extends {id: number}>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

console.log(getById<IUser>(arrayObjects, 2)); // { id: 2, name: 'Bob' }