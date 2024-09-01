package com.example.ecommerce.services;

import com.example.ecommerce.Exception.ProductNotFoundException;
import com.example.ecommerce.dao.CategoryRepository;
import com.example.ecommerce.dao.ProductRepository;
import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.CategoryName;
import com.example.ecommerce.entities.Product;
import com.example.ecommerce.entities.TypeMakeup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

   @Transactional
   public Product addProduct(Product product) {
       Category category = categoryRepository.findById(product.getCategory().getId())
               .orElseThrow(() -> new RuntimeException("Category not found"));

       if (category.getName() == CategoryName.MAKEUP) {
           if (product.getCategory().getTypeMakeup() == null) {
               throw new IllegalArgumentException("TypeMakeup is required for MAKEUP products");
           }
           // Ensure the category has the correct typeMakeup
           Category makeupCategory = categoryRepository.findByNameAndTypeMakeup(
                           CategoryName.MAKEUP, product.getCategory().getTypeMakeup())
                   .orElseThrow(() -> new RuntimeException("Makeup category not found for the given type"));
           product.setCategory(makeupCategory);
       } else {
           // For non-makeup products, ensure typeMakeup is null
           category.setTypeMakeup(null);
           product.setCategory(category);
       }

       return productRepository.save(product);
   }
    public Product save(Product product) {
        return productRepository.save(product);
    }


    public Category getCategoryByName(CategoryName name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
/*
    public List<Product> filterProducts(CategoryName categoryName, TypeMakeup typeMakeup) {
        // Use repository methods or JPQL to filter products
        return productRepository.findByCategoryNameAndTypeMakeup(categoryName, typeMakeup);
    }
*/
public Page<Product> findPaginatedProducts(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return productRepository.findAll(pageable);
}

    public Page<Product> filterPaginatedProducts(CategoryName categoryName, TypeMakeup typeMakeup, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategoryNameAndTypeMakeup(categoryName, typeMakeup, pageable);
    }
    public Product findProduct(Long id){
        return productRepository.findProductById(id).orElseThrow(()->new ProductNotFoundException("product by id"+id+"was not found"));
    }
    public List<Product> findAllProducts(){
        return productRepository.findAll();
    }
    /*public Product updateProduct(Product product){
        return productRepository.save(product);
    }*/
    @Transactional
    public Product updateProduct(Product updatedProduct) {
        Product existingProduct = productRepository.findById(updatedProduct.getId())
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + updatedProduct.getId() + " not found"));

        // Update basic product information
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());

        // Handle category and typeMakeup update
        Category updatedCategory = updatedProduct.getCategory();
        if (updatedCategory != null) {
            Category existingCategory = categoryRepository.findById(updatedCategory.getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            if (existingCategory.getName() == CategoryName.MAKEUP) {
                if (updatedCategory.getTypeMakeup() == null) {
                    throw new IllegalArgumentException("TypeMakeup is required for MAKEUP products");
                }
                // For MAKEUP category, update or find the correct category with typeMakeup
                existingCategory = categoryRepository.findByNameAndTypeMakeup(CategoryName.MAKEUP, updatedCategory.getTypeMakeup())
                        .orElseThrow(() -> new RuntimeException("Makeup category not found for the given type"));
            } else {
                // For non-MAKEUP categories, ensure typeMakeup is null
                existingCategory.setTypeMakeup(null);
            }

            existingProduct.setCategory(existingCategory);
        }

        return productRepository.save(existingProduct);
    }
     public void deleteProduct(Long id){
        productRepository.deleteProductById(id);
    }
}
