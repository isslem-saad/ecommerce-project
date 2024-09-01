package com.example.ecommerce.Controller;
import com.example.ecommerce.Exception.ProductNotFoundException;
import com.example.ecommerce.dao.CategoryRepository;
import com.example.ecommerce.dao.ProductRepository;
import com.example.ecommerce.entities.*;
import com.example.ecommerce.services.CategoryServiceImpl;
import com.example.ecommerce.services.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "/api", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/product")

public class ProductResource {
    
    @Autowired
    private ProductServiceImpl productServiceImpl;
    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products=productServiceImpl.findAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping("/paginated")
    public ResponseEntity<Page<Product>> getPaginatedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size) {
        Page<Product> productPage = productServiceImpl.findPaginatedProducts(page, size);
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> filterPaginatedProducts(
            @RequestParam CategoryName categoryName,
            @RequestParam(required = false) TypeMakeup typeMakeup,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size) {
        Page<Product> productPage = productServiceImpl.filterPaginatedProducts(categoryName, typeMakeup, page, size);
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }/*
   // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/filter")
   // @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Product>> filterProducts(@RequestParam CategoryName categoryName,
                                                        @RequestParam(required = false) TypeMakeup typeMakeup) {
        List<Product> products = productServiceImpl.filterProducts(categoryName, typeMakeup);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
*/
    @GetMapping("/find/{id}")
   // @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Product> getAllProductsById(@PathVariable("id") Long id){
        Product product=productServiceImpl.findProduct(id);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productServiceImpl.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);

    }
    @Transactional
    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        try {
            Product updatedProduct = productServiceImpl.updateProduct(product);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @DeleteMapping("/delete/{id}")

    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id){
        productServiceImpl.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
