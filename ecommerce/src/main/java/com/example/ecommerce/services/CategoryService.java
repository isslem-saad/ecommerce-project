package com.example.ecommerce.services;

import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.Product;

import java.util.Optional;

public interface CategoryService {
    public Category addCategory(Category category);
    public Optional<Category> findById(Long id);
}
