export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export type ProductInput = Omit<IProduct, 'id'>;
export type ProductUpdate = Partial<ProductInput>;

export const products: IProduct[] = [
  {
    id: 1,
    name: 'Notebook Gamer',
    description: 'Notebook com I7 e RTX 4060.',
    price: 4999.99,
    stock: 8,
    category: 'Eletrônicos',
  },
  {
    id: 2,
    name: 'Teclado Mecânico',
    description: 'Teclado com switches azuis.',
    price: 399.9,
    stock: 20,
    category: 'Periféricos',
  },
];
