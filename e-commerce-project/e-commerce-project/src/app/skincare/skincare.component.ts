import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
// import { EcommerceService } from '../ecommerce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { CategoryName } from '../models/category-name.enum';

@Component({
  selector: 'app-skincare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skincare.component.html',
  styleUrl: './skincare.component.scss'
})

  export class SkincareComponent implements OnInit {
    products: Product[] = [];
    currentPage = 0;
    pageSize = 4;
    totalItems = 0;
  
    constructor(private productService: ProductService) {}
  
    ngOnInit() {
      this.loadProducts();
    }
  
    loadProducts() {
      this.productService.filterPaginatedProducts(CategoryName.SKINCARE, null, this.currentPage, this.pageSize)
        .subscribe(response => {
          this.products = response.content;
          this.totalItems = response.totalElements;
        });
    }
  
    onPageChange(page: number) {
      this.currentPage = page;
      this.loadProducts();
    }
  
    // Ajout de cette méthode pour utiliser Math.ceil dans le template
    getTotalPages(): number {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  
    // Ajout de cette méthode pour générer un tableau pour l'itération
    getPageNumbers(): number[] {
      return Array(this.getTotalPages()).fill(0).map((x, i) => i);
    }
  }