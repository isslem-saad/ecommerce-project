import { Category } from "./category.model";

// src/app/models/product.model.ts
export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: Category;
    // category: {
    //   id: number;
    //   name: string;
    //   typeMakeup: string | null;
    // };
  }
  