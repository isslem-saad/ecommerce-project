import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CategoryName } from '../../models/category-name.enum';
import { TypeMakeup } from '../../models/type-makeup.enum';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/category.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})

export class AdminProductComponent implements OnInit {
      public products?: Product[];
      public editProduct: Product | null = null;
      public deleteProduct: Product | null = null;
      categories: Category[] = [];
      typeMakeupOptions = Object.values(TypeMakeup);
      productForm!: FormGroup;
      CategoryName = CategoryName;
      public searchTerm: string = '';
      constructor(
        private productService: ProductService, 
        private fb: FormBuilder, 
        private categoryService: CategoryService
      ) {}
      ngOnInit(): void {
        this.getCategories();
        this.getProducts();
        this.initForm();
      }
      public searchProducts(key: string): void {
        console.log(key);
        if (this.products) {
          const results: Product[] = [];
          for (const product of this.products) {
            if (product.name && product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
              results.push(product);
            }
          }
          this.products = results;
          if (results.length === 0 || !key) {
            this.getProducts();
          }
        }
      }
      getCategories(): void {
        this.categoryService.getCategories().subscribe((data: Category[]) => {
          // Remove duplicates based on category name
          const uniqueCategories = data.filter((category, index, self) =>
            index === self.findIndex((cat) => cat.name === category.name)
          );
          this.categories = uniqueCategories;
          console.log('Categories:', this.categories);
        });
      }
      initForm(): void {
        this.productForm = this.fb.group({
          id: [null],
          name: ['', Validators.required],
          description: ['', Validators.required],
          price: [null, [Validators.required, Validators.min(0)]],
          stock: [null, [Validators.required, Validators.min(0)]],
          imageUrl: ['', Validators.required],
          category: ['', Validators.required], // Store category ID
          typeMakeup: [{ value: null, disabled: true }]
        });
        this.productForm.get('category')?.valueChanges.subscribe((categoryId: number) => {
          const selectedCategory = this.categories.find(cat => cat.id === categoryId);
          const typeMakeupControl = this.productForm.get('typeMakeup');
          if (selectedCategory && selectedCategory.name === CategoryName.MAKEUP) {
            typeMakeupControl?.setValidators(Validators.required);
            typeMakeupControl?.enable();
          } else {
            typeMakeupControl?.clearValidators();
            typeMakeupControl?.disable();
            typeMakeupControl?.setValue(null);
          }
          typeMakeupControl?.updateValueAndValidity();
        });
      }
      onAddProduct(): void {
        if (this.productForm.valid) {
          const formData = this.productForm.value;
          const selectedCategory = this.categories.find(cat => cat.id === formData.category);
          if (!selectedCategory) {
            console.error('No category found for the selected ID.');
            return;
          }
          const productData: Product = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            imageUrl: formData.imageUrl,
            category: {
                id: selectedCategory.id,
                name: selectedCategory.name,
                typeMakeup: selectedCategory.name === CategoryName.MAKEUP ? formData.typeMakeup : null
            }
        };
          this.productService.addProduct(productData).subscribe(
            response => {
              console.log('Product added successfully:', response);
              this.getProducts();
              this.productForm.reset();
            },
            error => {
              console.error('Error adding product:', error);
            }
          );
        } else {
          console.error('Form is invalid');
        }
      }
      getProducts(): void {
        this.productService.getProducts().subscribe(
          (response: Product[]) => {
            this.products = response;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    
   
  
  private getCategoryName(categoryId: number): CategoryName {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : CategoryName.SKINCARE; // Default to SKINCARE or handle this case as needed
  }
  onCategoryChange(): void {
    const categoryId = this.productForm.get('category')?.value;
    console.log('Category changed. New category ID:', categoryId);
    const category = this.categories.find(cat => cat.id === categoryId);
    
    if (category && category.name === CategoryName.MAKEUP) {
      this.productForm.get('typeMakeup')?.enable();
      console.log('Makeup category selected. TypeMakeup enabled.');
    } else {
      this.productForm.get('typeMakeup')?.disable();
      this.productForm.get('typeMakeup')?.setValue(null);
      console.log('Non-makeup category selected. TypeMakeup disabled and set to null.');
    }
    console.log('Form state after category change:', this.productForm.value);
  }
  
  
  isMakeupCategory(): boolean {
    const categoryId = this.productForm.get('category')?.value;
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name === CategoryName.MAKEUP : false;
  }
  onUpdateProduct(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log('Form data before update:', formData);
  
      const selectedCategory = this.categories.find(cat => cat.id === formData.category);
      if (!selectedCategory) {
        console.error('No category found for the selected ID.');
        return;
      }
  
      const productData: Product = {
        id: this.editProduct?.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        imageUrl: formData.imageUrl,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
          typeMakeup: selectedCategory.name === CategoryName.MAKEUP ? formData.typeMakeup : null
        }
      };
      
      console.log('Sending update request with data:', productData);
      
      this.productService.UpdateProduct(productData).subscribe(
        response => {
          console.log('Product updated successfully. Server response:', response);
          this.getProducts(); // Refresh the product list
          
          // Update the specific product in the list
          if (this.products) {
            const index = this.products.findIndex(p => p.id === productData.id);
            if (index !== -1) {
              this.products[index] = { ...response };
            }
          }
          
          // Update editProduct
          this.editProduct = response;
          
          // Update the form with the response data
          this.productForm.patchValue({
            ...response,
            category: response.category.id,
            typeMakeup: response.category.typeMakeup
          });
          
          console.log('Form data after update:', this.productForm.value);
          
          this.closeModal('updateProductModal');
          setTimeout(() => {
            this.getProducts();
          }, 100);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      console.log('Form errors:', this.productForm.errors);
    }
  }
  /*
  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }*/
    closeModal(modalId: string): void {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // Remove modal backdrop
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while (modalBackdrops.length > 0) {
          modalBackdrops[0].remove();
        }
  
        // Remove inline styles added by Bootstrap
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      }
    }

  onDeleteProduct(productId: number | undefined): void {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.getProducts();
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
  }
  
 public onOpenModal(product: Product | null = null, mode: string): void {
  const container = document.body;
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');

  if (mode === 'add') {
    button.setAttribute('data-target', '#addProductModal');
    this.productForm.reset();
    console.log('Add modal opened. Form reset.');
  } else if (mode === 'edit') {
    this.editProduct = product;
    button.setAttribute('data-target', '#updateProductModal');
    if (product) {
      console.log('Edit modal opened. Product data:', product);
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: product.category.id,
        typeMakeup: product.category.typeMakeup
      });
  
      console.log('Form patched with product data:', this.productForm.value);

      // Enable or disable typeMakeup based on the category
      if (product.category.name === CategoryName.MAKEUP) {
        this.productForm.get('typeMakeup')?.enable();
      } else {
        this.productForm.get('typeMakeup')?.disable();
        this.productForm.get('typeMakeup')?.setValue(null);
      }

      // Ensure the category control is marked as touched to trigger validation
      this.productForm.get('category')?.markAsTouched();
      this.onCategoryChange(); // Update typeMakeup field state
      
      console.log('Final form state after opening edit modal:', this.productForm.value);
    }
  }
  else if (mode === 'delete') {
    this.deleteProduct = product;
    button.setAttribute('data-target', '#deleteProductModal');
  }

  container.appendChild(button);
  button.click();
  container.removeChild(button);
 }
}
