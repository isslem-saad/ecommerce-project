import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { CategoryName } from '../models/category-name.enum';
import { AuthService } from '../services/auth.service';
import { TypeMakeup } from '../models/type-makeup.enum';

@Component({
  selector: 'app-makeup',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './makeup.component.html',
  styleUrl: './makeup.component.scss'
})

export class MakeupComponent implements OnInit, OnChanges {
  @Input() selectedType: TypeMakeup | null = null;

  products: Product[] = [];
  currentPage = 0;
  pageSize = 4;
  totalItems = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedType']) {
      this.currentPage = 0;  // Reset to first page when type changes
      this.loadProducts();
    }
  }

  loadProducts() {
    this.productService.filterPaginatedProducts(CategoryName.MAKEUP, this.selectedType, this.currentPage, this.pageSize)
      .subscribe(response => {
        this.products = response.content;
        this.totalItems = response.totalElements;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageNumbers(): number[] {
    return Array(this.getTotalPages()).fill(0).map((x, i) => i);
  }
}