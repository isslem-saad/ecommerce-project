package com.example.ecommerce.services;

import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.CategoryName;
import com.example.ecommerce.entities.Product;

import java.util.List;

public interface ProductService {
    public Product addProduct(Product product);
    public Category getCategoryByName(CategoryName name) ;    //public Product addProduct(Product product,Long categoryId, Long typeId);
    public Product findProduct(Long id);
    public List<Product> findAllProducts();
    public Product updateProduct(Product product);
    public void deleteProduct(Long id);
}
