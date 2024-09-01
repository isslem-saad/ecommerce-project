package com.example.ecommerce.config;
import com.example.ecommerce.entities.Category;
import com.example.ecommerce.entities.CategoryName;
import com.example.ecommerce.entities.TypeMakeup;
import com.example.ecommerce.dao.CategoryRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    public ApplicationRunner init(CategoryRepository categoryRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                Category skincare = new Category();
                skincare.setName(CategoryName.SKINCARE);
                skincare.setTypeMakeup(null);
                categoryRepository.save(skincare);

                for (TypeMakeup type : TypeMakeup.values()) {
                    Category makeupCategory = new Category();
                    makeupCategory.setName(CategoryName.MAKEUP);
                    makeupCategory.setTypeMakeup(type);
                    categoryRepository.save(makeupCategory);
                }
            }
        };
    }
}
