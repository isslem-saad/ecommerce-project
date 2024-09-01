package com.example.ecommerce.dao;

import com.example.ecommerce.entities.CategoryName;
import com.example.ecommerce.entities.Product;
import com.example.ecommerce.entities.TypeMakeup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository <Product,Long> {

    void deleteProductById(Long id);
    //public  Product saveProduct(Product product) ;
    Optional<Product> findProductById(Long id);
   /* @Query("SELECT p FROM Product p WHERE p.category.name = :categoryName AND (:typeMakeup IS NULL OR p.category.typeMakeup = :typeMakeup)")
    List<Product> findByCategoryNameAndTypeMakeup(
            @Param("categoryName") CategoryName categoryName,
            @Param("typeMakeup") TypeMakeup typeMakeup);
*/
   @Query("SELECT p FROM Product p WHERE p.category.name = :categoryName AND (:typeMakeup IS NULL OR p.category.typeMakeup = :typeMakeup)")
   Page<Product> findByCategoryNameAndTypeMakeup(
           @Param("categoryName") CategoryName categoryName,
           @Param("typeMakeup") TypeMakeup typeMakeup,
           Pageable pageable);

}
