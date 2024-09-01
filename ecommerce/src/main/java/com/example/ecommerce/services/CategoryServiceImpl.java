package com.example.ecommerce.services;

import com.example.ecommerce.dao.CategoryRepository;
import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }
    public List<Category> findAllCategories(){
        return categoryRepository.findAll();
    }
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }
}
