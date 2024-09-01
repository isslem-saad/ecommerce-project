
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryName } from '../models/category-name.enum';
import { TypeMakeup } from '../models/type-makeup.enum';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  categories = [CategoryName.SKINCARE, CategoryName.MAKEUP];
  typeMakeupOptions = [TypeMakeup.LIPSTICK, TypeMakeup.EYESHADOW, TypeMakeup.FOUNDATION];
  selectedCategory: CategoryName = CategoryName.SKINCARE;
  selectedTypeMakeup?: TypeMakeup;
 products: Product[] = [];
  constructor(private productService: ProductService) { }

  onFilterChange() {
    this.productService.filterProducts(this.selectedCategory, this.selectedTypeMakeup).subscribe({
      next: (products) => {
        this.products = products;
        console.log('Filtered products:', products); // For debugging
      },
      error: (error) => {
        console.error('Error fetching filtered products:', error);
      }
    });
  }
}