package com.example.ecommerce.dao;

import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.CategoryName;
import com.example.ecommerce.entities.Product;
import com.example.ecommerce.entities.TypeMakeup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByName(CategoryName name);
    Optional<Category> findByNameAndTypeMakeup(CategoryName name, TypeMakeup typeMakeup);

}
