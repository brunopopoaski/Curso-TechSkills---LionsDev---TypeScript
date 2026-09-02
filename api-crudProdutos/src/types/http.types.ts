import type { ParsedQs } from 'qs';
import type { IProduct, ProductInput, ProductUpdate } from '../utils/types.ts';

export type EmptyParams = Record<string, never>;
export type EmptyBody = Record<string, never>;
export type EmptyQuery = ParsedQs;

export type ProductIdParams = { id: string };
export type ProductQuery = { name?: string; category?: string };

export type ProductListResponse = IProduct[];
export type ProductResponse = IProduct;
export type ProductCreatedResponse = IProduct;
export type ProductUpdateResponse = IProduct;
export type ProductDeleteResponse = {
  message: string;
  product: IProduct;
};

export type CreateProductBody = ProductInput;
export type UpdateProductBody = ProductUpdate;
