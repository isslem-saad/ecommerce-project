package com.example.ecommerce.entities;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@NoArgsConstructor
public class ProductRequest {
    private String name;
    private String description;
    private Long price;
    private Long stock;
    private String imageUrl;
    private String category; // This is the category name from the frontend
    private String typeMakeup; // This is the type of makeup if applicable

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public Long getPrice() {
        return price;
    }

    public Long getStock() {
        return stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public String getTypeMakeup() {
        return typeMakeup;
    }
}
