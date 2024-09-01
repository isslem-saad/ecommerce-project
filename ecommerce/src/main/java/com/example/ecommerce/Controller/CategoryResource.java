package com.example.ecommerce.Controller;


import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.Product;
import com.example.ecommerce.services.CategoryServiceImpl;
import com.example.ecommerce.services.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
//@CrossOrigin(origins = "http://localhost:8082", maxAge = 3600, allowCredentials="true")

public class CategoryResource {
    @Autowired
    private CategoryServiceImpl categorieServiceImpl;
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping/*("/all")*/

    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories=categorieServiceImpl.findAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category newCategory=categorieServiceImpl.addCategory(category);
        return new ResponseEntity<>(newCategory,HttpStatus.CREATED);

    }

}
