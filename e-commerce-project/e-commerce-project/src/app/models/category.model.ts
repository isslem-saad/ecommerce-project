import { CategoryName } from './category-name.enum';
import { TypeMakeup } from './type-makeup.enum'; // Assuming you have a TypeMakeup enum

export interface Category {
    id: number;
    name: CategoryName;
    typeMakeup?: TypeMakeup|null; // Optional if the category is not "MAKEUP"
}
